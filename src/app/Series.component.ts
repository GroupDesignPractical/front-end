import { Component } from '@angular/core';
@Component({
  selector: 'ng-display-series',
  template: `
      <div class="sidebar">
        Display Series       
        <div class="sidebar-divider"></div>
        Markets:<p>FTSE 100<br>Dow Jones<br>Crude Oil</p>
        <div class="sidebar-divider"></div>
        Trends:<p>Twitter</p>
        <div class="sidebar-divider"></div>
        News Articles:<p>BBC News<br>Reuters</p>
      </div>
  `
})
export class SeriesComponent {
}
