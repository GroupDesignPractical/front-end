/*var options = {
        chart: {
            renderTo: 'graph-container2',
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
};*/


import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'graph-comp',
  template: `
      <div class="sidebar">
        <chart [options]="options"></chart>
      </div>
  `
})

export class GraphComponent{
  constructor() {
    this.options = {
      title : { text : 'simple chart' },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2],
      }]
    };
  }
  options: Object;
}
