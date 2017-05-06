import { Injectable } from '@angular/core';
import { Http, Headers, Response }       from '@angular/http';
import { TrendData } from './series';
import { SeriesChange } from './series-change';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TrendService {
	
	constructor(private http: Http) {}
	
	private processTrend(res:Response) : TrendData[] {
	var l = [];
	var date, oldDate : Date = undefined;
    for (var i = 0; i < res.json().data.length; i+=1){
      oldDate = date;
	  date = new Date(res.json().data[i].date);
	  if(oldDate == undefined || (date.getDate() != oldDate.getDate())){
	    l.push({data: [Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()), res.json().data[i].volume], subject: res.json().data[i].datum, sentiment: res.json().data[i].sentiment})
	  }
    }
	return l;
  }
	
	getTrends(trend : SeriesChange) : TrendData[] {
		var endDate = new Date();
		var startDate = new Date(endDate.getFullYear() - 5, endDate.getMonth(), endDate.getDate());
		var end = encodeURIComponent(endDate.toISOString());
		var start = encodeURIComponent(startDate.toISOString());
		
		var url = "http://51.140.124.252:3000/trends?source="+trend.name+"&start="+start+"&end="+end;
		
		var l = [];
		
		this.http.get(url)
		.toPromise()
		.then(res => { 
		  l = this.processTrend(res);
		}).catch(this.handleError);
		
		return l;
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