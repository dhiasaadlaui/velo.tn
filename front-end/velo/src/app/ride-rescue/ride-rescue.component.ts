import { Component, OnInit } from '@angular/core';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-ride-rescue',
  templateUrl: './ride-rescue.component.html',
  styleUrls: ['./ride-rescue.component.scss']
})
export class RideRescueComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;
  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home'},
      {label: 'Volonteer', icon: 'pi pi-fw pi-calendar', routerLink: ['login'] },
      {label: 'Make Claim', icon: 'pi pi-fw pi-pencil', routerLink: ['claim'] },
      {label: 'Claims', icon: 'pi pi-fw pi-file' , routerLink: ['claims']},
      {label: 'Disponibility', icon: 'pi pi-user-edit' , routerLink: ['disp']},
      {label: 'Claims for me', icon: 'pi pi-inbox' , routerLink: ['assigned']},
      {label: 'Assign claims', icon: 'pi pi-sitemap' , routerLink: ['assign']},
      {label: 'Stats', icon: 'pi pi-chart-bar' , routerLink: ['stats']}
        ];
    this.activeItem = this.items[0];
  }
  

}
