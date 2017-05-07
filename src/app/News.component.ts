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

/*class Source {
	name : string;
	articles : Observable<News[]>;
}*/

@Component({
  selector: 'news-comp',
  providers: [NewsService],
  template: `
    <div class="pure-g" id="article-grid" >
      <div *ngFor = "let article of articlesToDisplay" class="pure-u-1">
        {{article.source_name}} : {{article.date}} : {{article.headline}}
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

	private compareDates(a : News, b : News) : number {
      return a.date.getTime() - b.date.getTime();
    }
		
	ngOnInit(){
	}
}
