import { Component, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { TimePeriod } from './time-period';

const PERIODS: TimePeriod[] = [
  { numMonths: 60, description: '5 years' },
  { numMonths: 12, description: '1 year' },
  { numMonths: 6, description: '6 months' },
  { numMonths: 1, description: '1 month' }
];

@Component({
  selector: 'time-period',
  template: `
      <div class="sidebar">
        Time Period
        <div class="sidebar-divider"></div>
        <form class="pure-form radio-section">
          <div class="radio-container" *ngFor="let period of periods">
            <input id="{{period.numMonths}}" type="radio" name="period-radios" value="{{period.numMonths}}" [checked]="period === selectedPeriod" (change)="onChange(period)">
            <label for="{{period.numMonths}}">
              <span><span></span></span>{{period.description}}
            </label>
          </div>
        </form>
      </div>
  `
})
export class TimePeriodComponent implements AfterContentInit {
  periods = PERIODS;
  selectedPeriod: TimePeriod;
  @Output() sPeriod = new EventEmitter();
  ngAfterContentInit(): void {
    this.selectedPeriod = PERIODS[3];
    this.sPeriod.emit(this.selectedPeriod);
  }
  onChange(period: TimePeriod): void {
    this.selectedPeriod = period;
    this.sPeriod.emit(this.selectedPeriod);
  }
}
