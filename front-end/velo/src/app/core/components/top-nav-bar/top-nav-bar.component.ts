import { Component, OnInit } from '@angular/core';
import 'jquery';
 import 'popper.js';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {

  constructor(public userService:AuthenticationService) { }

  ngOnInit() {    

  }

}
