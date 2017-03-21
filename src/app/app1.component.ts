import { Component } from '@angular/core';
@Component({
  selector: 'my-app2',
  template: `
    <h1>Simple Deployment v3</h1>
    <nav>
      <a routerLink="/crisis-center" routerLinkActive="active">crisis center</a>
      <a routerLink="/heroes" routerLinkActive="active">heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent1 { }
