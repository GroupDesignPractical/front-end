import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartModule } from 'angular2-highcharts';

@Component({
  selector: 'graph-comp',
  template: `
      <div class="sidebar">
        <div class="pure-g">
          <div class="pure-u-1">
            <chart [options]="options" (load)="saveInstance($event.context)"></chart>
          </div>
        </div>
      </div>
  `
})

export class GraphComponent implements OnChanges{
  @Input() options: Object;
  @Input() numMonths: number;
  chart: any;
  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

  ngOnChanges(changes: SimpleChanges) {
    try {
      this.chart.setTitle({ text: null }, { text: '' + this.numMonths });
    }
    catch(err){}
    finally{};
  }
}
