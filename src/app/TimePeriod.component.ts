import { Component, OnInit } from '@angular/core';
import { TimePeriod } from './time-period';

const PERIODS: TimePeriod[] = [
  { numMonths: 60, description: '5 years' },
  { numMonths: 12, description: '1 year' },
  { numMonths: 6, description: '6 months' },
  { numMonths: 1, description: '1 month' }
];

@Component({
  selector: 'ng-time-period',
  template: `
      <div class="sidebar">
        Time Period
        <div class="sidebar-divider"></div>
        <form class="pure-form radio-section">
          <div class="radio-container" *ngFor="let period of periods">
            <input id="{{period}}" type="radio" name="period-radios" value="{{period}}" [checked]="period === selectedPeriod" (change)="onChange(period)">
            <label for="{{period}}">
              <span><span></span></span>{{period.description}}
            </label>
          </div>
        </form>
        {{selectedPeriod.numMonths}}
      </div>
  `
})
export class TimePeriodComponent implements OnInit {
  periods = PERIODS;
  selectedPeriod: TimePeriod;
  ngOnInit(): void {
    this.selectedPeriod = PERIODS[0];
  }
  onChange(period: TimePeriod): void {
    this.selectedPeriod = period;
  }
}
