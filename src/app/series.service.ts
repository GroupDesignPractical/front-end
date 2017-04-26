import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Stock, Trend, News } from './series';
import { TRENDS } from './mock-trends';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SeriesService {

  private trendsUrl = 'http://localhost:3000/trend_sources';

  constructor(private http: Http) {}
  
  getTrends(): Observable<Trend[]> {
    return this.http.get(this.trendsUrl)
               .map(this.extractData)
               .catch(this.handleError);
  }

  private extractData(res: Response) {
    alert(res.json());
    //return body.data || { };
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


