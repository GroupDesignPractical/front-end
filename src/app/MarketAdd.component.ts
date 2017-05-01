import { Component, OnInit }         from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import {StockAddService} from './StockAdd.service'


@Component({
  selector: 'market-add',
  providers: [StockAddService],
  template: `
    <div class="pure-g">
      <div class="pure-u-1 pure-u-md-3-24" id="market-search-label">
        <label>Add Stock: </label>
      </div>
      <div class="pure-u-1 pure-u-md-21-24">
        <div id="stock-search-box">
          <div class="pure-u-1-24"></div>
          <input [(ngModel)]="newStock" placeholder="e.g. Nikkei 225" class="pure-u-22-24" (keyup) = "search(newStock)">
			    <div>
				    <div *ngFor = "let stock of stocks | async" >
				      {{stock}}
			      </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MarketAddComponent implements OnInit{
	

    stocks: Observable<string[]> = Observable.of<string[]>(["A"]);
	private tempStocks : string[] = ["A", "B", "C"];
	private test = "A"
	private searchTerms = new Subject<string>();
	
	constructor(
		private stockAddService: StockAddService){
			setTimeout(() => {
			  this.test = "B"
			}, 1000);
		}

	search(term: string): void{
		this.searchTerms.next(term);
	}
	
	addStock() : void{
		console.log("Added!")
	}
	
	newStock = '';
	
	ngOnInit(){
		this.stocks = this.searchTerms
			.debounceTime(50) //wait 50 ms after keystroke
			.distinctUntilChanged()
			.switchMap(term => 
				this.stockAddService.search(term))
			.catch(error => {console.log(error); return Observable.of<string[]>(["C"]);})
			.do(x => console.log("x is " + x)); //DEBUG
	}
}
