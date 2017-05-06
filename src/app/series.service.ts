import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Stock, Trend, News } from './series';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SeriesService {

  private trendsUrl = 'http://marketjunction.meming.science:3000/trend_sources';
  private newsUrl = 'http://marketjunction.meming.science:3000/news_sources';

  constructor(private http: Http) {}
  
  getTrends(): Observable<Trend[]> {
    return this.http.get(this.trendsUrl)
               .map(this.extractTrends)
               .catch(this.handleError);
  }

  private extractTrends(res: Response) {
    var trends: Trend[] = new Array(res.json().length)
    for (var i = 0; i < res.json().length; i++){
      var name = res.json()[i];
      var UID = 2000 +  i;
      var index = i + 1;
      var color: string;
      switch(i) {
        case 0:
          color = '#0033CC';
          break;
        case 1:
          color = '#006600';
          break;
        case 2:
          color = '#660066';
          break;
        case 3:
          color = '#996633';
          break;
        case 4:
          color = '#CCCC00';
          break;
        default:
          color = '#AAAAAA';
      }
	  var trendSource: Trend = {name: name, UID: UID, index: index, selected: false, hovered: false, color: color};
      trends[i] = trendSource;
    }
    return trends || { };
  }

  getNews(): Observable<News[]> {
    return this.http.get(this.newsUrl)
               .map(this.extractNews)
               .catch(this.handleError);
  }

  private extractNews(res: Response) {
    var news: News[] = new Array(res.json().length)
    for (var i = 0; i < res.json().length; i++){
      var name = res.json()[i].name;
      var UID = 3000 +  i;
      var index = i + 1;
      var shape: number;
      if (i < 5) {
        shape = i + 3
      } else {
        shape = 0
      }
	  var newsSource: News = {name: name, UID: UID, index: index, selected: false, hovered: false, shape: shape};
      news[i] = newsSource;
    }
    return news || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}


