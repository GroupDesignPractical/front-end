import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';

import * as Fuse from 'fuse.js';

export interface Stock{
	symbol : string;
	name : string;
	icb_supersector: string;
	icb_industry: string;
	market_cap_group: string;
}

@Injectable()
export class StockAddService {

  constructor(private http: Http) {
	  
  }
  
  private options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "name"
    ]
  };
  
  getStockData() : Observable<Stock[]> {
	return this.http
	           .get('http://marketjunction.meming.science:3000/stocks')
			   .map(response => response.json() as Stock[])
  }
  private fuse : Fuse = new Fuse([], this.options);
  private result = this.getStockData().first().subscribe(
                              value => {
										 this.fuse = new Fuse(value, this.options);
									   },
							  error => {console.log(error)});

  search(term: string): Observable<Stock[]> {
	var ans : Stock[] = this.fuse.search(term).slice(0, 3) as Stock[];	
    return Observable.of<Stock[]>(ans);
  }
}
