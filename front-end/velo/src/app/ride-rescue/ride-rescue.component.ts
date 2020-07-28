import { Component, OnInit } from '@angular/core';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';
import {AuthenticationService} from '../core/services/authentication.service';
import { User } from '../core/models/User';


@Component({
  selector: 'app-ride-rescue',
  templateUrl: './ride-rescue.component.html',
  styleUrls: ['./ride-rescue.component.scss']
})
export class RideRescueComponent implements OnInit {

  currentUser : User;
  items: MenuItem[];
  activeItem: MenuItem;
  constructor(private authserv:AuthenticationService) { }

  ngOnInit() {
    console.log(this.authserv.getCurrentUser);
    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home'},
      {label: 'Volonteer', icon: 'pi pi-fw pi-calendar', routerLink: ['login-enrol'] },
      {label: 'Make Claim', icon: 'pi pi-fw pi-pencil', routerLink: ['claim'] },
      {label: 'Claims', icon: 'pi pi-fw pi-file' , routerLink: ['claims']},
      {label: 'Disponibility', icon: 'pi pi-user-edit' , routerLink: ['disp']},
      {label: 'Claims for me', icon: 'pi pi-inbox' , routerLink: ['assigned']}
        ];

    this.activeItem = this.items[0];
    this.currentUser = this.authserv.getCurrentUser;
    if (this.currentUser.ismoderator){
      this.items.push({label: 'Administrator', icon: 'pi pi-sitemap' , routerLink: ['admin']});
    }
  }

  logout()
  {
    this.currentUser = null ; 
    this.authserv.logout();
  }
  

}
