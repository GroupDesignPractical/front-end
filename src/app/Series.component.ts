import { Component, OnInit, AfterViewInit, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { SeriesChange } from './series-change';
import { SeriesService } from './series.service';
import { Stock, Trend, News } from './series';

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
      <div class="sidebar">
        Display Series       
        <div class="sidebar-divider"></div>
        <p>Stocks</p>
        <!-- <form class="pure-form radio-section"> -->
          <div *ngFor="let market of markets">
            <input id="{{market.UID}}" type="checkbox" name="market-checkboxes" value="{{market.UID}}" [checked]="market.selected" (change)="onChange({UID: market.UID, index: market.index, selected: $event.target.checked, name: market.name, color: market.color})">
            <label for="{{market.UID}}">
              <span class="{{'market-color-' + market.index + ' market'}}"><span></span></span>{{market.name}}
            </label>
          </div>
        <!-- </form> -->
        <div class="sidebar-divider"></div>
        <p>Trends</p>
        <form class="pure-form radio-section">
          <div *ngFor="let trend of trends">
            <input id="{{trend.UID}}" type="checkbox" name="trend-checkboxes" value="{{trend.UID}}" [checked]="trend.selected" (change)="onChange({UID: trend.UID, index: trend.index, selected: $event.target.checked, name: trend.name, color: trend.color})">
            <label for="{{trend.UID}}">
              <span class="{{'trend-color-' + trend.index + ' trend'}}"><span></span></span>{{trend.name}}
            </label>
          </div>
        </form>
        <div class="sidebar-divider"></div>
        <p>News Articles</p>
          <div *ngFor="let article of articles" (click)="articleClicked(article)" (mouseenter)="article.hovered = true" (mouseleave)="article.hovered = false">
            <div style="float: left; padding-left: 8px;" [innerHTML]="getCheckBoxElement(article.index) | safeHtml"></div>
            <div style="margin-left: 31px; margin-bottom: -10px;">{{ article.name }}</div><br>
          </div>
      </div>
  `,
  providers: [SeriesService]
})
export class SeriesComponent implements AfterViewInit, OnInit{
  markets: any = [
    {UID: 1002, name: 'FTSE 100', index: 1, selected: false, color: '#FFCC00'},
    {UID: 1043, name: 'Dow Jones', index: 2, selected: false, color: '#FF66FF'},
    {UID: 1434, name: 'Crude Oil', index: 3, selected: false, color: '#66FF33'}
  ];

  trends: Trend[];

  articles: any = [
    {UID: 3673, name: 'BBC News', index: 1, selected: false, hovered: false, shape: 3},
    {UID: 3048, name: 'Reuters', index: 2, selected: false, hovered: false, shape: 4},
    {UID: 3673, name: 'Telegraph', index: 3, selected: false, hovered: false, shape: 5},
    {UID: 3673, name: 'Guardian', index: 4, selected: false, hovered: false, shape: 6},
    {UID: 3673, name: 'Daily Mail', index: 5, selected: false, hovered: false, shape: 7},
    {UID: 3673, name: 'ABC', index: 6, selected: false, hovered: false, shape: 0}
  ];

  constructor(private seriesService: SeriesService) {}

  ngOnInit(): void {
    this.seriesService.getTrends().then(trends => alert(trends.toString()));
  }

  @Output() sChange = new EventEmitter();
  ngAfterViewInit(): void {
    /* Set first source of each type to be selected and emit this as a change. */
    if (this.markets.length > 0){
      this.markets[0].selected = true;
      this.sChange.emit({UID: this.markets[0].UID, index: this.markets[0].index, selected: true, color: this.markets[0].color, name: this.markets[0].name});
    }
    if (this.trends.length > 0){
      this.trends[0].selected = true;
      this.sChange.emit({UID: this.trends[0].UID, index: this.trends[0].index, selected: true, color: this.trends[0].color, name: this.trends[0].name});
    }
    if (this.articles.length > 0){
      this.articles[0].selected = true;
      this.sChange.emit({UID: this.articles[0].UID, index: this.articles[0].index, selected: true, shape: this.articles[0].shape, name: this.articles[0].name});
    }
  }
  onChange(sChange: SeriesChange): void {
    this.sChange.emit(sChange);
  }

  getCheckBoxElement(index: number): string {
    var htmlString: string = '<svg height="17" width="17">\n<defs>\n<linearGradient id="RGgrad"><stop offset="0%" stop-color="red"/><stop offset="50%" stop-color="red"/><stop offset="50%" stop-color="lime"/><stop offset="100%" stop-color="lime" /></linearGradient>\n</defs>';
    switch(index) {
      case 1:
        htmlString += '<polygon points="8.5,1.7 1,15 16,15" stroke="blue" stroke-width="0.8" fill=';
        break;
      case 2:
        htmlString += '<polygon points="2,2 2,15 15,15 15,2" stroke="blue" stroke-width="0.8" fill=';
        break;
      case 3:
        htmlString += '<polygon points="8.5,1 16.7,6.8 13.6,16.3 3.4,16.3 0.3,6.8" stroke="blue" stroke-width="0.8" fill=';
        break;
      case 4:
        htmlString += '<polygon points="8.5,1 15,4.2 15,12.8 8.5,16 2,12.8 2,4.2" stroke="blue" stroke-width="0.8" fill=';
        break;
      case 5:
        htmlString += '<polygon points="8.5,1 14.2,3.2 16,10.3 11.9,16.1 5.1,16.1 1,10.3 2.8,3.2" stroke="blue" stroke-width="0.8" fill=';
        break;
      default:
        htmlString += '<circle cx="8.5" cy="8.5" r="7.5" stroke="blue" stroke-width="0.8" fill=';
    };
    if (this.isArticleSelected(index)) {
      htmlString += '"url(#RGgrad)" style="opacity: 1" />\n</svg>';
    } else {
      if (this.isArticleHovered(index)) {
        htmlString += '"url(#RGgrad)" style="opacity: 0.5" />\n</svg>';
      } else {
        htmlString += '"none" style="opacity: 1" />\n</svg>';
      };
    }
    return htmlString;
  };

  isArticleSelected(index: number): boolean {
    for (var i = 0; i < this.articles.length; i++) {
      if ((this.articles[i].index == index) && (this.articles[i].selected)) {
        return true;
      }
    }
    return false;
  };  

  isArticleHovered(index: number): boolean {
    for (var i = 0; i < this.articles.length; i++) {
      if ((this.articles[i].index == index) && (this.articles[i].hovered)) {
        return true;
      }
    }
    return false;
  };

  articleClicked(article: any) {
    article.selected = ! article.selected;
    this.onChange({UID: article.UID, index: article.index, selected: article.selected, name: article.name, shape: article.shape, color:'#000000', type: 'article'});
  }
}
