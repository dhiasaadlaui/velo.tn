import { Component, OnInit } from '@angular/core';
import 'jquery';
 import 'popper.js';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {
 showAdminTopNav:boolean =false;
  constructor(private userService:UserService) { }

  ngOnInit() {
    if(this.userService.getCurrentUser().username === 'admin'){
      this.showAdminTopNav = true;
    }

  }

}
