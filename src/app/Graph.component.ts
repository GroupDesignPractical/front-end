import { Component } from '@angular/core';
@Component({
  selector: 'ng-graph',
  template: `
      <div class="sidebar">
        <div id="graph-container" style="width:100%; height: 400px:"></div>
      </div>
      <script>
$(function () { 
    var myChart = Highcharts.chart('graph-container', {
        chart: {
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
    });
});
      </script>
  `
})
export class GraphComponent {
}
