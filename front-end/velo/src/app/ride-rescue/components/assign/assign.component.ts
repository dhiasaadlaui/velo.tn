import { User } from './../../model/User';
import { Component, OnInit } from '@angular/core';
import { Claim } from '../../model/Claim';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {

  users: any[];
  userList: User[];
  selectedUser: any;
  value: any;
  junk: any[];

  claimList: Claim[];

  selectedClaim: Claim;

  displayDialog: boolean;

  cols: any[];

  claim: Claim = new Claim();
 
  newClaim: boolean;

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.users = [] ;
    this.junk = [] ;
    this.userService.getClaims().subscribe((data: Claim[]) => this.claimList = data);
    this.userService.getAll().subscribe((data: User[]) => { this.userList = data ; 
    return this.userList.map(user => {
      this.junk.push({name: user.name, id: user.id});}) ;    
      });
  
    this.cols = [
      { field: 'title', header: 'title' },
      { field: 'subject', header: 'subject' },
      { field: 'status', header: 'status' },
      { field: 'level', header: 'level' }
  ];
  }

  save() {
    // control on the current user
    let error;
    let claims = [...this.claimList];
    claims[this.claimList.indexOf(this.selectedClaim)] = this.claim;
    console.log(this.selectedClaim);
    this.claimList = claims;
    this.userService.asign(this.selectedUser.id,this.selectedClaim.id).subscribe(resp => error = resp);
    this.claim = null;
    this.displayDialog = false;
    
}

delete() {
  // control on the current user
  let error;
  let index = this.claimList.indexOf(this.selectedClaim);
  console.log(this.selectedClaim);
  this.claimList = this.claimList.filter((val, i) => i != index);
  this.userService.deleteClaim(this.selectedClaim).subscribe(resp => error = resp);
  this.claim = null;
  this.displayDialog = false;
  
}

onRowSelect(event) {
  this.newClaim = false;
  this.claim = this.cloneClaim(event.data);
  this.displayDialog = true;
  this.users = this.junk ;
}

cloneClaim(c: Claim): Claim {
  let claim = new Claim();
  for (let prop in c) {
    claim[prop] = c[prop];
  }
  return claim;
}

}
