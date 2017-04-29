import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';

import * as Fuse from 'fuse.js';

interface Stock{
	name : string;
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
	keys : ["name"]
  };
  
  getStockData() : Observable<Stock[]> {
	return this.http
	           .get('http://52.140.124.252:3000/stocks')
			   .map(response => response.json().data as Stock[]);
  }
  private stocks : Stock[] = [];
  private result = this.getStockData().first().subscribe(
                              values => this.stocks = values);
  private fuse = new Fuse(this.stocks, this.options);

  search(term: string): Observable<string[]> {
	var result : string[] = this.fuse.search(term).map(elem => elem['name']).slice(0, 3);  
    return Observable.of<string[]>(result);
  }
}