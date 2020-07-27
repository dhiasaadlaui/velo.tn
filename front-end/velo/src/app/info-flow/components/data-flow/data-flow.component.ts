import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions ,ChartOptions  } from 'chart.js';
 import { Label } from 'ng2-charts';
 import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { log } from 'src/app/core/models/log';
import { ActivatedRoute, Router } from '@angular/router';
 
@Component({
  selector: 'app-data-flow',
  templateUrl: './data-flow.component.html',
  styleUrls: ['./data-flow.component.scss']
})
export class DataFlowComponent implements OnInit {
  //riding log
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [20, 20, 20, 20, 20, 20, 20], label: 'Result' } 
  ];
 


//conduct summary
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Personal Behaviour', 'Recieved Points', 'Recieved Commends', 'Recieved Reports', 'Recieved StoryLikes'];

  public radarChartData: ChartDataSets[] = [
    { data: [70, 59, 42, 32, 56], label: 'Result' } 
  ];
  public radarChartType: ChartType = 'radar';



  // using history 

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

// logs 

public logs: log[] = [new log (1,"parkiteer" ,"lyoum"), new log (2,"ride rescue" ,"lyoum"), new log (1,"marketplace" ,"lbereh")];
  
  constructor(private route:ActivatedRoute,private router: Router) { }

  ngOnInit() {
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  public getRidingHistory(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20)
    ];
    this.barChartData[0].data = data;
    const data1 = [
      Math.round(Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20)
    ];
    this.barChartData[1].data = data1;
    
  }
  public getConductSummary(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20)
    ];
    this.radarChartData[0].data = data;
    const data1 = [
      Math.round(Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20),
      (Math.random() * 20)
    ];
     
  }
  public getAverageUsing(): void {
    const data: number[] = [(Math.random() * 20),(Math.random() * 20),(Math.random() * 20),(Math.random() * 20)];
     this.pieChartData =data;
  }
 
goBack(){
  this.router.navigate(['..'], { relativeTo: this.route});

}

}
