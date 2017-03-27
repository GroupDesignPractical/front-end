import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { MarketAddComponent }     from './MarketAdd.component';
import { MarketSuggestComponent } from './MarketSuggest.component';
import { TimePeriodComponent } from './TimePeriod.component';
import { SeriesComponent } from './Series.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    MarketAddComponent,
    MarketSuggestComponent,
    TimePeriodComponent,
    SeriesComponent
  ],
  bootstrap: [ MarketAddComponent, MarketSuggestComponent, TimePeriodComponent, SeriesComponent ]
})
export class AppModule { }
