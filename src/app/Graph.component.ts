import { Component, Input, OnChanges, SimpleChanges, OnInit, AfterViewInit } from '@angular/core';
import { ChartModule } from 'angular2-highcharts';
import { SeriesChange } from './series-change';

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

export class GraphComponent implements OnChanges, OnInit, AfterViewInit{
  @Input() options: Object;
  @Input() numMonths: number;
  @Input() periodEndUTC: number;
  chart: any;
  seriesTypes: any;
  len: number;
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
    this.seriesTypes = {market: 0, trend: 1, news: 2};
    this.len = 1000;
  }
  
  ngAfterViewInit() {
	  this.ngOnChanges(null);
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

  PeriodChange(months: number) {
	this.numMonths = months;
	this.ngOnChanges(null);
  }
  
  MarketChange(market: SeriesChange){
	market.type = this.seriesTypes.market;
	if(market.selected){
		this.chart.addSeries({
			name: market.name,
			data: this.GetMarketData(market),
			color: market.color,
			id: market.UID,
			zIndex: 1,
			seriestype: market.type
		});
	} else {
		var a = this.chart.series.filter(function(s){return (s.name == market.name && s.options.id == market.UID && s.options.seriestype == market.type)});
		a.forEach(function(x){x.remove()});
	};
  }

  GetMarketData(market: SeriesChange) {
    return this.GetRanLine(this.len);
  }

  TrendChange(trend: SeriesChange){
	trend.type = this.seriesTypes.trend;
	if(trend.selected){
		this.chart.addSeries({
			name: trend.name,
			data: this.GetTrendData(trend),
			color : trend.color,
			id : trend.UID,
			yAxis : 1, 
			type : "column",
			zIndex : 0,
			seriestype: trend.type
		});
	} else {
		var a = this.chart.series.filter(function(s){return (s.name == trend.name && s.options.id == trend.UID && s.options.seriestype == trend.type)});
		a.forEach(function(x){x.remove()});
	};
  }

  GetTrendData(trend: SeriesChange) {
    return this.GetRanPoint(this.len);
  }

  GetNewsData(article: SeriesChange) {
    return this.GetRanPoint(this.len);
  }

  NewsChange(news: SeriesChange){
	news.type = this.seriesTypes.news;
        // Shapes are supplied with number of points, which must be converted to array index
        if (news.shape >= 3){
          news.shape -= 2;
        }
	if(news.selected){
		this.chart.addSeries({
			name: news.name,
			data: this.GetNewsData(news),
			id : news.UID,
			yAxis : 1, 
			type : "scatter",
			zIndex : 1,
			marker: {symbol:["circle", "triangle", "square", "diamond","triangle-down"][news.shape]},
			seriestype:news.type
		});
	} else {
		var a = this.chart.series.filter(function(s){return (s.name == news.name && s.options.id == news.UID && s.options.seriestype == news.type)});
		a.forEach(function(x){x.remove()});
	};
  }

  GetRanLine(len: number){
	var ranLine = [];
	var temp = Math.random() * 100;
	for(var i = 0; i < len; i++){
	 temp += Math.random()*10;
	 temp -= 5;
	 ranLine.push([Date.UTC(2017,0,(1+i)), temp]);
	};
	return ranLine;
  }

  GetRanPoint(len: number){
	var ranPoints = [];
	var temp = 0;
	for(var i = 0; i < len; i++){
	 temp = Math.random()*100;
	 ranPoints.push([Date.UTC(2017,0,(1+i)), temp]);
	};
	return ranPoints;
  }
}
