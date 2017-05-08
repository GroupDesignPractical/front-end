import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

export class News{
	source_name : string;
	date: Date;
  datestr: String; // javascript date formatters are abysmal
	headline: string;
	description: string;
	link: string;
	facebook_reacts: {
		angry: number;
		haha: number;
		like: number;
		love: number;
		sad: number;
		wow: number;
	}
}

@Injectable()
export class NewsService {

  constructor(private http: Http) {
	  
  }
  
  getNews(api_name: string, name : string, startDate: Date, endDate: Date) : Observable<News[]> {
	
	var start = encodeURIComponent(startDate.toISOString())
	var end = encodeURIComponent(endDate.toISOString())
	
  var url = "http://marketjunction.meming.science:3000/news?source="+api_name+"&start="+start+"&end="+end
	
  var ans : News[] = []
	
	return this.http
	           .get(url)
		       .map(res => {
		       	             var arr = (res.json() as News[])
		       	                        .map(e => {e.source_name = name; return e;})
		       	             return arr})
		       .catch(this.handleError);
  }
  
  private compareNews(a : News, b : News) : number {
    if(a == undefined) return 1
    else if(b == undefined) return -1
    else return this.totalReacts(b) - this.totalReacts(a);
  }
	
	private totalReacts(a : News) : number {
		if(a == undefined) return 0;
		var total =  a.facebook_reacts.angry + a.facebook_reacts.haha + a.facebook_reacts.like + a.facebook_reacts.love + a.facebook_reacts.sad + a.facebook_reacts.wow;
		return total;
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
