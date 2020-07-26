import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  constructor(private userService: UserServiceService) { }
  data: any;
  testData: any[] = [65, 59, 90, 81, 56, 55, 40];
  values:any[];
  stats: any[];
  options: any;
  ngOnInit() {
    this.values = [];
    this.userService.getStats().subscribe((data: any[]) => { this.stats = data ; 
      for (let key in data) {
        let value = data[key];
        console.log(value[0]['stat']);
        this.values.push(value[0]['stat']);
      }
     });
     this.options = {
      responsive: false,
      maintainAspectRatio: false
    };
    
    this.data = {
      labels: ['Tunis', 'Carthage', 'Cité El Khadra', 'Djebel Jelloud', 'El Menzah', 'El Omrane', 'El Ouardia'],
      datasets: [
          {
              label: 'Claim Occured Places',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: this.values
          }
      ]
  };
}
  }


