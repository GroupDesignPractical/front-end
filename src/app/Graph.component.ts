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

export class GraphComponent implements OnInit{
  ngOnInit() {
    this.options = {
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
          data: [5, 10, 3]
      }]
    };
  }
  options: Object;
}
