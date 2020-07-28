import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { log } from 'src/app/core/models/log';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFlowService } from 'src/app/core/services/data-flow.service';
import { DataFlow } from 'src/app/core/models/DataFlow';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';

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

  isSubscribed: boolean = false;

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
  public pieChartLabels: Label[] = ['Events', 'Marketplace', 'Parkiteer', 'Ride Rescue', 'Published Stories'];
  public pieChartData: number[] = [300, 500, 100, 200, 150];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(102,204,204,0.2)', 'rgba(251, 226, 152, 1)'],
    },
  ];

  private data: DataFlow;

  constructor(private route: ActivatedRoute, private router: Router, private _userService: UserService,
    private _dataFlowService: DataFlowService) { }

  ngOnInit() {
    const s = this._dataFlowService.getData(this._userService.getCurrentUser().username).subscribe(response => {
      if(response==null){
        this.isSubscribed = false;

      }
      else {
        this.data = response;
        console.log("data=", this.data) ;
         this.isSubscribed = true;
  
      }
     }, (err => {
      console.log(err.message);
    }));
  }
  public getConductSummary(): void {
    // Only Change 3 values
    this._dataFlowService.getPoints(this._userService.getCurrentUser().username).subscribe(response => {
      this.data.points = response
    });
    this._dataFlowService.getDataLikes(this._userService.getCurrentUser().username).subscribe(response => {
      this.data.likes = response
    });
    const points =  this.data.points;
    const StoryLikes =  this.data.likes;
    const commends = this.data.commends;
    const reports = this.data.reports;
    const behaviour = (points + StoryLikes + commends) - (reports *2)
    const data = [
      behaviour,
      points,
      commends,
      reports,
      StoryLikes 
    ];
    this.radarChartData[0].data=data;
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

  public getAverageUsing(): void {
    const data: number[] = [(Math.random() * 20), (Math.random() * 20), (Math.random() * 20), (Math.random() * 20)];
    this.pieChartData = data;
  }

  goBack() {
    this.router.navigate(['..'], { relativeTo: this.route });

  }

  createData() {
    const data = new DataFlow(1, this._userService.getCurrentUser().username, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    console.log(data);
    this._dataFlowService.createStory(data).subscribe(response => {
      console.log("data created successfuly");
    }, err => {
      console.log("error when creating data", err);

    });
  }
  reload() {
    location.reload();
  }

}
