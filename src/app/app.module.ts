import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { ChartModule } from 'angular2-highcharts';
import { FormsModule }          from '@angular/forms';
import { MarketAddComponent }     from './MarketAdd.component';
import { MarketSuggestComponent } from './MarketSuggest.component';
import { TimePeriodComponent } from './TimePeriod.component';
import { SeriesComponent } from './Series.component';
import { GraphComponent } from './Graph.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ChartModule.forRoot(require('highcharts'))
  ],
  declarations: [
    MarketAddComponent,
    MarketSuggestComponent,
    TimePeriodComponent,
    SeriesComponent,
    GraphComponent
  ],
  bootstrap: [ MarketAddComponent, MarketSuggestComponent, TimePeriodComponent, SeriesComponent, GraphComponent ]
})

export class AppModule { }
