/* /// <reference path="../highcharts/highstock.d.ts" />
/// <reference path="../highcharts/highcharts.d.ts" />
*/

var options = {
        chart: {
            /* renderTo: 'graph-container', */
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
};


import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'ng-graph',
  template: `
      <div class="sidebar">
      </div>
  `
})

export class GraphComponent{

}
