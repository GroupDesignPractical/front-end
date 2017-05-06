import { Component, OnInit, Input }         from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { SeriesChange }      from './series-change';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { NewsService, News } from './News.service'

class Source {
	name : string;
	articles : Observable<News[]>;
}

@Component({
  selector: 'news-comp',
  providers: [NewsService],
  template: `
    <div class="pure-g" id="article-grid" >
	  <div *ngFor= "let source of selectedNewsSources" class="pure-u-1">
	    {{source.name}}
		<div *ngFor="let article of source.articles | async; let i = index" class="pure-g">
			<div *ngIf="i == 0" class="pure-u-1 pure-u-md-1-3"><p>{{article.headline}}</p></div>
			<div *ngIf="i == 1" class="pure-u-1 pure-u-md-1-3"><p>{{article.headline}}</p></div>
			<div *ngIf="i == 2" class="pure-u-1 pure-u-md-1-3"><p>{{article.headline}}</p></div>
		</div>
	  </div>
	</div>
  `
})
export class NewsComponent implements OnInit{

    @Input() private selectedNewsSources : Source[] = [];

    constructor(
		private newsService: NewsService){}
		
	NewsChange(sChange : SeriesChange) {
		if(sChange.selected){
			var len = this.selectedNewsSources.length;
			var endDate = new Date();
			var startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
			var articles = this.newsService.getNews(sChange.api_name, startDate, endDate);
			var s = {name : sChange.name, articles : articles};
			this.selectedNewsSources[len] = s;
		}else{
			this.selectedNewsSources = this.selectedNewsSources.filter(elem => elem.name != sChange.name);
		}
	}
		
	ngOnInit(){
	}
}
