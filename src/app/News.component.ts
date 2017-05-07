import { Component, OnInit, Input, Injectable }         from '@angular/core';
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
    <div class="pure-g" id="article-grid" >
      <div *ngFor = "let article of articlesToDisplay" class="pure-u-1 tooltip" id="article-item" (click)="goToLink(article)">
        <span class="tooltiptext">{{article.link}}</span>
        <p> {{article.source_name}} : {{article.date}} : {{article.headline}} </p>
        <p> Facebook Reactions: like - {{article.facebook_reacts.like}}; angry - {{article.facebook_reacts.angry}};
                                haha - {{article.facebook_reacts.haha}}; love - {{article.facebook_reacts.love}};
                                sad - {{article.facebook_reacts.sad}}; wow - {{article.facebook_reacts.wow}}.
      </div>
	</div>
  `
})

@Injectable()
export class NewsComponent implements OnInit{

    @Input() private selectedNewsSources : string[] = [];
    @Input() private articlesToDisplay : News[] = [];

    constructor(
		private newsService: NewsService){}
		
	NewsChange(sChange : SeriesChange) {
		if(sChange.selected){
			var len = this.selectedNewsSources.length;
			var endDate = new Date();
			var startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
			var articles = this.newsService.getNews(sChange.api_name, sChange.name, startDate, endDate)
			               .toPromise()
			               .then(res => {this.articlesToDisplay = this.articlesToDisplay.concat(res.filter(e => e.date != undefined)) 
			               	             this.articlesToDisplay.sort(this.compareDates);
			                             console.log(this.articlesToDisplay);
			                            })
			               .catch(error => console.log(error));
			var s = sChange.name;
			this.selectedNewsSources[len] = s;
		}else{
			this.articlesToDisplay = this.articlesToDisplay.filter(elem => elem.source_name != sChange.name);
		}
	}

	goToLink(article : News) {
		window.open(article.link);
	}
  
    //reverse chronological order
	private compareDates(a : News, b : News) : number {
      return Date.parse(b.date.toString()) - Date.parse(a.date.toString());
    }
		
	ngOnInit(){
	}
}
