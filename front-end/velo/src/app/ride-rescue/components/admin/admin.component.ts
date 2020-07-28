import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from '../../model/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  currentUser : User;

  constructor(private authserv:AuthenticationService) { }

  ngOnInit() {
    this.currentUser = this.authserv.getCurrentUser;
  }

}
