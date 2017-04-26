import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
// Enable production mode unless running locally
if (!(/localhost/.test(document.location.host) || /192.168.99.100/.test(document.location.host))) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);
