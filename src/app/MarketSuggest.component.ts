import { Component } from '@angular/core';

const MARKETS: String[] = [
  'FTSE',
  'TSEC',
  'CAC 40',
  'IBEX',
  'WIG'
];

@Component({
  selector: 'suggested-markets',
  template: `
      <div class="pure-g">
        <div class="pure-u-1 pure-u-md-4-24">
          <p>
            <label style="padding-left: 10px;">Suggested Markets: </label>
          </p>
        </div>
        <div class="pure-u-1 pure-u-md-20-24">
          <p>
            <span *ngFor="let market of markets">{{market}}&nbsp;&nbsp;&nbsp;</span>
          </p>
        </div>
      </div>
  `
})
export class MarketSuggestComponent { 
  markets = MARKETS;
}
