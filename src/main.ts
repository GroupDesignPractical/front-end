import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { HCNGModule } from 'highcharts-ng';
import { enableProdMode } from '@angular/core';
// Enable production mode unless running locally
if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);
