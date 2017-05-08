import { Component, OnInit, Input, Injectable, AfterViewChecked, ElementRef, ViewChild}         from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { SeriesChange }      from './series-change';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { NewsService, News } from './News.service'

@Component({
  selector: 'news-comp',
  providers: [NewsService],
  template: `
    <div class="pure-g" #autoscroll id="article-grid" >
      <div *ngFor = "let article of articlesToDisplay" class="pure-u-1 tooltip" id="article-item" (click)="goToLink(article)">
        <span class="tooltiptext">{{article.description}}</span>
        {{article.datestr}}: {{article.source_name}} - {{article.headline}} <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            👍:{{article.facebook_reacts.like}}
            ❤️:{{article.facebook_reacts.love}}
            😂:{{article.facebook_reacts.haha}}
            😯:{{article.facebook_reacts.wow}}
            😢:{{article.facebook_reacts.sad}}
            😡:{{article.facebook_reacts.angry}}
      </div>
	</div>
  `
})

@Injectable()
export class NewsComponent implements OnInit, AfterViewChecked{
    @ViewChild('autoscroll') private scrollContainer : ElementRef

    @Input() private selectedNewsSources : string[] = []
    @Input() private articlesToDisplay : News[] = []

    constructor(
		private newsService: NewsService){}
		
	NewsChange(sChange : SeriesChange) {
		if(sChange.selected){
			var len = this.selectedNewsSources.length;
			var endDate = new Date()
			var startDate = new Date()
      startDate.setHours(endDate.getHours() - 24)
			var articles = this.newsService.getNews(sChange.api_name, sChange.name, startDate, endDate)
			               .toPromise()
			               .then(res => {this.articlesToDisplay = this.articlesToDisplay.concat(res.filter(e => e.date != undefined)) 
                                   this.articlesToDisplay.sort(this.compareDates)
                                   this.articlesToDisplay = this.uniqArticles(this.articlesToDisplay)
                                   this.articlesToDisplay.map(function(a){a.datestr=a.date.toString().replace(/.*(\d\d\d\d-\d+-\d+).*?T(\d+:\d+).*/, "[$1 $2]")})
                                   this.articlesToDisplay = this.articlesToDisplay.reverse()
			                            })
			               .catch(error => console.log(error));
			var s = sChange.name;
			this.selectedNewsSources[len] = s;
		}else{
			this.articlesToDisplay = this.articlesToDisplay.filter(elem => elem.source_name != sChange.name);
		}
	}

	private goToLink(article : News) {
		window.open(article.link);
	}

  private uniqArticles = function(a : News[]) : News[] {
    var seen = {};
    return a.filter(function(item) {
      var k = item.headline
      return seen.hasOwnProperty(k) ? false : (seen[k] = true)
    })
  }
  
    //reverse chronological order
	private compareDates(a : News, b : News) : number {
      return Date.parse(b.date.toString()) - Date.parse(a.date.toString());
    }
		
	ngOnInit(){
    this.scrollToBottom()
  }

  ngAfterViewChecked() {        
    this.scrollToBottom()
  } 

  private scrollToBottom(): void {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight
  }
}

