import { Component, OnInit } from '@angular/core';

import { TimePeriod } from './time-period';
import { TimePeriodComponent } from './TimePeriod.component';
import { GraphComponent } from './Graph.component';
import { SeriesComponent } from './Series.component';
import { NewsComponent } from './News.component';
import { SeriesChange } from './series-change';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Stock } from './series';

@Component({
  selector: 'my-app',
  template: `
    <div class="pure-g" id="title-grid-row">
      <div class="pure-u-1">
        <h1 id="title-text">Market Junction</h1>
      </div>
    </div>
    <div class="pure-g" id="search-bar-grid-row">
      <div class="pure-u-1 pure-u-md-1-6"></div>
      <div class="pure-u-1 pure-u-md-2-3">
        <market-add (sAdd)="handleMarketAddEvent($event)">
          Loading market search...
        </market-add>
      </div>
      <div class="pure-u-1 pure-u-md-1-6"></div>
    </div>

    <div class="pure-g" id="suggested-markets-grid-row">
      <div class="pure-u-1 pure-u-md-1-6"></div>
      <div class="pure-u-1 pure-u-md-2-3">
        <suggested-markets>
            Loading suggested markets...
        </suggested-markets>
      </div>
      <div class="pure-u-1 pure-u-md-1-6"></div>
    </div>

    <div class="pure-g" id="main-grid-row">
      <div class="pure-u-1 pure-u-md-3-24">
        <time-period (sPeriod)="handlePeriodChangeEvent($event)">
            Loading time period selection...
        </time-period>
      </div>
      <div class="pure-u-1 pure-u-md-15-24">
        <graph-comp [periodEndUTC]="endDateUTC" [numMonths]="selectedPeriod" [options]="options">
          Load graph...
        </graph-comp>
      </div>
      <div class="pure-u-1 pure-u-md-6-24">
        <display-series (sChange)="handleSeriesChangeEvent($event)">
            Loading series selection...
        </display-series>
        {{ endDate }}
      </div>
    </div>
	<p></p><br>
	<div class="pure-g" id="news-grid-row">
      <div class="pure-u-1 pure-u-md-1">
        <news-console>
            Loading news console...
        </news-console>
      </div>
    </div>
  `
})

export class MainComponent implements OnInit, AfterViewInit {

  @ViewChild(GraphComponent)
  private graphComponent: GraphComponent;
  @ViewChild(SeriesComponent)
  private seriesComponent: SeriesComponent;
  @ViewChild(NewsComponent)
  private newsComponent: NewsComponent;

  ngAfterViewInit() {

  }

  MarketChange(market: SeriesChange) { this.graphComponent.MarketChange(market); }
  TrendChange(trend: SeriesChange) { this.graphComponent.TrendChange(trend); } 
  NewsChange(news: SeriesChange) { this.graphComponent.NewsChange(news); }


  ngOnInit() {
    this.selectedPeriod = 1;
    var endDate = new Date();
    this.endDateUTC = endDate.valueOf()
    this.options = {
      title: {
            text: null
      },
      chart: {
        height: "500px",
        showAxis: true
      },
      credits: {
        text: ''
      },
      legend: {
        enabled: false
      },
      xAxis: {
          type: 'datetime'
      },
      yAxis: [{
          title: {
            text: 'Share Price'
          }
        },
        {
          title: {
            text: 'Popularity' 
          },
          opposite: true
        }
      ]     
    };
  }
  handlePeriodChangeEvent(period) {
    this.selectedPeriod = period.numMonths;
	this.graphComponent.PeriodChange(this.selectedPeriod);
  }
  handleMarketAddEvent(stock) {
	  this.seriesComponent.addMarket(stock);
  }
  handleSeriesChangeEvent(sChange) {
    if (sChange.UID >= 3000){
      this.graphComponent.NewsChange(sChange);
    } else if (sChange.UID >= 2000){
      this.graphComponent.TrendChange(sChange);
    } else if (sChange.UID >= 1000){
      this.graphComponent.MarketChange(sChange);
    };
  }
  options: Object;
  selectedPeriod: number;
  endDateUTC: number;
}
