import { Component, OnInit, AfterViewInit, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { SeriesChange } from './series-change';
import { SeriesService } from './series.service';
import { Stock, Trend, News } from './series';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from "rxjs/Rx";


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    //console.log(this.sanitized.bypassSecurityTrustHtml(value));
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'display-series',
  template: `
      <div class="sidebar" id="series">
        <h3>Stocks</h3>
        <div class="sidebar-divider"></div>
        <div class="pure-menu pure-menu-scrollable sidebar-divider" id=stocks>
          <div *ngFor="let market of markets">
            <input id="{{market.UID}}" type="checkbox" name="market-checkboxes" value="{{market.UID}}" [checked]="market.selected" (change)="onChange({UID: market.UID, index: market.index, selected: $event.target.checked, name: market.name, color: market.color, symbol: market.symbol})">
            <label for="{{market.UID}}">
              <span class="{{'market-color-' + market.index + ' market'}}"><span></span></span>{{market.name}}
            </label>
          </div>
        </div>
        <div class="sidebar-divider"></div>
        <h3>Trends</h3>
        <div class="sidebar-divider"></div>
        <form class="pure-form radio-section">
          <div *ngFor='let trend of trends | async'>
            <input id="{{trend.UID}}" type="checkbox" name="trend-checkboxes" value="{{trend.UID}}" [checked]="trend.selected" (change)="onChange({UID: trend.UID, index: trend.index, selected: $event.target.checked, name: trend.name, color: trend.color, symbol: 'NONE'})">
            <label for="{{trend.UID}}">
              <span class="{{'trend-color-' + trend.index + ' trend'}}"><span></span></span>{{trend.name}}
            </label>
          </div>
        </form>
        <div class="sidebar-divider"></div>
	    <h3>News</h3>
      <div class="sidebar-divider"></div>
		<div class="pure-menu pure-menu-scrollable sidebar-divider" id=news>
          <div *ngFor='let article of articles | async' (click)="articleClicked(article)" (mouseenter)="article.hovered = true" (mouseleave)="article.hovered = false">
            <div style="float: left; padding-left: 8px;" [innerHTML]="getCheckBoxElement(article.index, article.selected, article.hovered) | safeHtml"></div>
            <div style="margin-left: 31px;">{{ article.name }}</div><br>
          </div>
		</div>
      </div>
  `,
  providers: [SeriesService]
})
export class SeriesComponent implements AfterViewInit, OnInit{

  markets: Stock[] = [];
  
  trends: Observable<Array<Trend>>;

  articles: Observable<Array<News>>;

  constructor(private seriesService: SeriesService) {}

  ngOnInit(): void {
	this.trends = this.seriesService.getTrends();
    this.articles = this.seriesService.getNews();	
  }

  @Output() sChange = new EventEmitter();
  ngAfterViewInit(): void {
	  
  }
  onChange(sChange: SeriesChange): void {
    this.sChange.emit(sChange);
  }

  getCheckBoxElement(index: number, selected: boolean, hovered: boolean): string {
    var htmlString: string = '<svg height="17" width="17">\n<defs>\n<linearGradient id="RGgrad"><stop offset="0%" stop-color="red"/><stop offset="50%" stop-color="red"/><stop offset="50%" stop-color="lime"/><stop offset="100%" stop-color="lime" /></linearGradient>\n</defs>';
    switch(index) {
      case 1:
        htmlString += '<polygon points="8.5,1.7 1,15 16,15" stroke="blue" stroke-width="0.8" fill=';
        break;
      case 2:
        htmlString += '<polygon points="2,2 2,15 15,15 15,2" stroke="blue" stroke-width="0.8" fill=';
        break;
      case 3:
        htmlString += '<polygon points="8.5,2 15,8.5 8.5,15 2,8.5" stroke="blue" stroke-width="0.8" fill=';
        break;
      case 4:
        htmlString += '<polygon points="1,1.7 16,1.7 8.5,15" stroke="blue" stroke-width="0.8" fill=';
        break;
      default:
        htmlString += '<circle cx="8.5" cy="8.5" r="7.5" stroke="blue" stroke-width="0.8" fill=';
    };
    if (selected) {
      htmlString += '"url(#RGgrad)" style="opacity: 1" />\n</svg>';
    } else {
      if (hovered) {
        htmlString += '"url(#RGgrad)" style="opacity: 0.5" />\n</svg>';
      } else {
        htmlString += '"none" style="opacity: 1" />\n</svg>';
      };
    }
    return htmlString;
  };
  articleClicked(article: any) {
    article.selected = ! article.selected;
    this.onChange({UID: article.UID, index: article.index, selected: article.selected, name: article.name, api_name : article.api_name, shape: article.shape, color:'#000000', type: 'article', symbol: 'NONE'});
  }
  addMarket(stock: Stock) {
	  var UID = this.markets.length + 1000;
	  var index = this.markets.length + 1;
	  var color = this.getColor(this.markets.length);
	  var name = stock.name;
	  var symbol = stock.symbol;
	  var newStock: Stock = {name: name, symbol: symbol, UID: UID, index: index, selected: true, hovered: false, color: color};
	  this.markets.push(newStock);
	  this.onChange({UID: UID, index: index, selected: true, color: color, shape: 0, type: 'market', name: name, api_name : 'NONE', symbol: symbol});
  }
  getColor(index: number) {
    switch(index){
      case 0:
        return '#FFCC00';
      case 1:
        return '#FF66FF';
      case 2:
        return '#66FF33';
      case 3:
        return '#66FFFF';
      case 4:
        return '#FF3300';
      default:
        return '#000000';
	}
  }
}
