import { Component, Output, EventEmitter } from '@angular/core';
import { CompleteStock, Stock } from './stocks';
import { RecoService } from './Recommendations.service';
import { SeriesChange } from './series-change';
import { Observable }        from 'rxjs/Observable';

@Component({
  selector: 'suggested-markets',
  providers: [RecoService],
  template: `
      <div class="pure-g">
        <div class="pure-u-1 pure-u-md-4-24">
          <p>
            <label style="padding-left: 10px;">Suggested Stocks: </label>
          </p>
        </div>
        <div class="pure-u-1 pure-u-md-20-24">
          <p>
            <span *ngFor="let stock of suggestedStocks | async"><span class="stock-suggest" (click) = "addStock(stock)">{{stock.name}}</span>&nbsp;&nbsp;&nbsp;</span>
          </p>
        </div>
      </div>
  `
})
export class MarketSuggestComponent { 
  currentStocks: Stock[] = [];
  suggestedStocks: Observable<Stock[]> = Observable.of<Stock[]>([]);
  constructor(private recoService: RecoService){}
  
  MarketChange(market: SeriesChange){
	if(market.selected){
		this.currentStocks.push({name: market.name, symbol: market.symbol});
		this.RefreshSuggestions();
	} else {
		this.currentStocks = this.currentStocks.filter(item => (item.symbol != market.symbol));
		this.RefreshSuggestions();
	}
  }
  
  @Output() sAdd = new EventEmitter();
	
  addStock(stock: Stock) : void{
	this.sAdd.emit(stock);
  }
  
  RefreshSuggestions(){
    this.suggestedStocks = this.recoService.getRecommendationsFTSE(this.currentStocks);
  }

}
