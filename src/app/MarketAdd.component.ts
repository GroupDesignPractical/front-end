import { Component } from '@angular/core';
@Component({
  selector: 'market-add',
  template: `
      <div class="pure-g">
        <div class="pure-u-1 pure-u-md-3-24" id="market-search-label">
          <label>Add Stock: </label>
        </div>
        <div class="pure-u-1 pure-u-md-21-24">
          <div id="market-search-box">
            <div class="pure-u-1-24"></div>
            <input [(ngModel)]="newMarket" placeholder="e.g. Nikkei 225" class="pure-u-22-24">
          </div>
        </div>
      </div>
  `
})
export class MarketAddComponent {
  newMarket = '';
}
