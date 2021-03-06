import { Claim } from './../../model/Claim';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../model/User';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-claimwatcher',
  templateUrl: './claimwatcher.component.html',
  styleUrls: ['./claimwatcher.component.scss'],
})
export class ClaimwatcherComponent implements OnInit {

  claimList: Claim[];

  states: any[];

  selectedState: any;
  
  selectedClaim: Claim;

  displayDialog: boolean;

  cols: any[];

  claim: Claim = new Claim();
 
  newClaim: boolean;
  
  currentUser: User = new User();

  constructor(private userService: UserServiceService,private authserv:AuthenticationService) { }

  ngOnInit() {
    this.userService.getClaims().subscribe((data: Claim[]) => this.claimList = data);
    this.cols = [
      { field: 'title', header: 'title' },
      { field: 'subject', header: 'subject' },
      { field: 'status', header: 'status' },
      { field: 'level', header: 'level' },
      { field: 'phone', header: 'phone' }
  ];
  this.states = [{name: 'CLOSED'},{name: 'PENDING'}];
  this.currentUser = this.authserv.getCurrentUser;
  }
/**
   * must be secured the only the claims ower 
   * can save/delete
   */
  save() {
    // control on the current user
  
    let error;
    
    if(this.currentUser.id == this.selectedClaim.user.id) {
      let claims = [...this.claimList];
       claims[this.claimList.indexOf(this.selectedClaim)] = this.claim;
       console.log(this.selectedClaim);
       this.claimList = claims;
       if(this.selectedState)
       this.claim.status = this.selectedState.name ;
      this.userService.updateClaim(this.claim).subscribe(resp => error = resp);
      this.claim = null;
      this.displayDialog = false;
    }else this.displayDialog = false;
    
}

delete() {
  // control on the current user
  let error;

  if(this.currentUser.id == this.selectedClaim.user.id) {
  let index = this.claimList.indexOf(this.selectedClaim);
  console.log(this.selectedClaim);
  this.claimList = this.claimList.filter((val, i) => i != index);
  this.userService.deleteClaim(this.selectedClaim).subscribe(resp => error = resp);
  this.claim = null;
  this.displayDialog = false;
  }else this.displayDialog = false;
  
}

onRowSelect(event) {
  this.newClaim = false;
  this.claim = this.cloneClaim(event.data);
  this.displayDialog = true;
}

cloneClaim(c: Claim): Claim {
  let claim = new Claim();
  for (let prop in c) {
    claim[prop] = c[prop];
  }
  return claim;
}




}
