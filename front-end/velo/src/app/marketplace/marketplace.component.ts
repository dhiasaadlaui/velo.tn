import { UserService } from './../core/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {

  constructor(
    private _userService: UserService) { }

  username: string;
  points: number;


  ngOnInit() {
    this.username = this._userService.getCurrentUser().username;
    this.points = this._userService.getUserPoints();
  }

}
