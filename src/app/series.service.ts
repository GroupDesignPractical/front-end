import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Stock, Trend, News } from './series';
import { TRENDS } from './mock-trends';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SeriesService {

  private trendsUrl = 'localhost:3000/trend_sources';

  constructor(private http: Http) {}
  
  getTrends(): Promise<Trend[]> {
    return this.http.get(this.trendsUrl)
               .toPromise()
               .then(response => response.json().data as Trend[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error with the Trend Service occured', error);
    return Promise.reject(error.message || error);
  }
}


