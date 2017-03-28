import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ChartModule } from 'angular2-highcharts';

@Component({
  selector: 'graph-comp',
  template: `
      <div class="sidebar">
        <div class="pure-g">
          <div class="pure-u-1-24">
            <div style="height:460px;"></div>
            <svg (click)="periodBack()" style="float: right" width="50%" viewBox="0 0 10 20">
              <polygon class="arrow" stroke-width="0.8" stroke="blue" points="2,10 9,19 9,1"/>
            </svg>
          </div>
          <div class="pure-u-11-12">
            <chart [options]="options" (load)="saveInstance($event.context)"></chart>
          </div>
          <div class="pure-u-1-24">
            <div style="height:460px;"></div>
            <svg (click)="periodForward()" style="float: left" width="50%" viewBox="0 0 10 20">
              <polygon class="arrow" stroke-width="0.8" stroke="blue" points="9,10 2,19 2,1"/>
            </svg>
          </div>
        </div>
      </div>
  `
})

export class GraphComponent implements OnChanges, OnInit{
  @Input() options: Object;
  @Input() numMonths: number;
  @Input() periodEndUTC: number;
  chart: any;
  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

  ngOnInit() {
    // set period end to be the end of the month supplied, and to not have time
    var peDate = new Date();
    peDate.setTime(this.periodEndUTC);
    var years = peDate.getUTCFullYear();
    var months = peDate.getUTCMonth();
    var days = this.lastDayOfMonth(months, years);
    this.periodEndUTC = Date.UTC(years, months, days);
  }
  ngOnChanges(changes: SimpleChanges) {
    try {
      this.chart.xAxis[0].setExtremes(this.UTCMonthMinus(this.periodEndUTC, this.numMonths, true), this.periodEndUTC);
    }
    catch(err){}
    finally{};
  }
  periodBack() {
    this.periodEndUTC = this.UTCMonthMinus(this.periodEndUTC, this.numMonths, false);
    this.ngOnChanges(null);
  }
  periodForward() {
    this.periodEndUTC = this.UTCMonthPlus(this.periodEndUTC, this.numMonths, false);
    this.ngOnChanges(null);
  }
  UTCMonthMinus(start: number, months: number, plusOne: boolean) {
    var end = new Date();
    end.setTime(start);
    var year = end.getUTCFullYear();
    var month = end.getUTCMonth();
    var day = end.getUTCDate();
    year = year - Math.floor(months / 12);
    var monthsM = months % 12
    if ((month - monthsM) < 0) {
      monthsM = 12 - monthsM;
      year = year - 1;
      month = month + monthsM;
    } else {
      month = month - monthsM;
    }
    if (plusOne) {
      day = 1;
      if (month == 11) {
        month = 0;
        year = year + 1;
      } else {
        month = month + 1;
      }
    } else {
      day = this.lastDayOfMonth(month, year);
    }
    return Date.UTC(year, month, day);
  }
  UTCMonthPlus(start: number, months: number, plusOne: boolean) {
    var end = new Date();
    end.setTime(start);
    var year = end.getUTCFullYear();
    var month = end.getUTCMonth();
    var day = end.getUTCDate();
    year = year + Math.floor(months / 12);
    var monthsM = months % 12
    if ((month + monthsM) > 11) {
      monthsM = 12 - monthsM;
      year = year + 1;
      month = month - monthsM;
    } else {
      month = month + monthsM;
    }
    if (plusOne) {
      day = 1;
      if (month == 11) {
        month = 0;
        year = year + 1;
      } else {
        month = month + 1;
      }
    } else {
      day = this.lastDayOfMonth(month, year);
    }
    return Date.UTC(year, month, day);
  }
  lastDayOfMonth(month: number, year: number): number {
    switch(month){
      case 3:
      case 5:
      case 8:
      case 10:
        return 30;
      case 1:
        if (this.isLeapYear(year)) return 29;
        return 28;
      default:
        return 31;
    }
  }
  isLeapYear(year: number){
    if ((year % 400) == 0) return true;
    if ((year % 100) == 0) return false;
    if ((year % 4) == 0) return true;
    return false;
  }
}
