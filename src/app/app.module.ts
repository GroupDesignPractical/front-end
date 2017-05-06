import { NgModule, Pipe, PipeTransform }  from '@angular/core';
import { BrowserModule }                  from '@angular/platform-browser';
import { ChartModule }                    from 'angular2-highcharts';
import { FormsModule }                    from '@angular/forms';
import { HttpModule, JsonpModule }                     from '@angular/http';

import { MainComponent } from './Main.component';
import { MarketAddComponent }     from './MarketAdd.component';
import { MarketSuggestComponent } from './MarketSuggest.component';
import { TimePeriodComponent } from './TimePeriod.component';
import { SeriesComponent } from './Series.component';
import { GraphComponent } from './Graph.component';
import { NewsComponent } from './News.component';

import { SeriesService } from './series.service';

import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    //console.log(this.sanitized.bypassSecurityTrustHtml(value));
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ChartModule.forRoot(require('highcharts'))
  ],
  declarations: [
    MainComponent,
    MarketAddComponent,
    MarketSuggestComponent,
    TimePeriodComponent,
    SeriesComponent,
    GraphComponent,
	NewsComponent,
    SafeHtmlPipe
  ],
  bootstrap: [ MainComponent ],
  providers: [ SeriesService ]
})

export class AppModule { }
