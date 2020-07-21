import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ChartDataSets, ChartType, RadialChartOptions ,ChartOptions  } from 'chart.js';
 import { Label } from 'ng2-charts';
 import * as pluginDataLabels from 'chartjs-plugin-datalabels';

 
@Component({
  selector: 'app-info-flow',
  templateUrl: './info-flow.component.html',
  styleUrls: ['./info-flow.component.scss']
})
export class InfoFlowComponent implements OnInit {
 
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['Events', 'Marketplace', 'Parkiteer', 'Ride Rescue'];
  public pieChartData: number[] = [300, 500, 100, 200];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(102,204,204,0.2)'],
    },
  ];

constructor(private route:ActivatedRoute,private router: Router) { }

  ngOnInit() {
  }

  onActivate(componentReference) {
    console.log(componentReference)
    componentReference.anyFunction();
 }
 
showStories(){
  this.router.navigate(['stories'], { relativeTo: this.route});
}
showPersonalData(){
this.router.navigate(['data-flow'], { relativeTo: this.route});
 
}
}
