import { Component, OnInit } from '@angular/core';
import { Claim } from '../../model/Claim';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-assginedtome',
  templateUrl: './assginedtome.component.html',
  styleUrls: ['./assginedtome.component.scss']
})
export class AssginedtomeComponent implements OnInit {

  states: any[];

  selectedState: any;

  claimList: Claim[];

  selectedClaim: Claim;

  displayDialog: boolean;

  cols: any[];

  claim: Claim = new Claim();
 
  newClaim: boolean;
  

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    //current user ------- 
    this.userService.getAssignedTome(8).subscribe((data: Claim[]) => this.claimList = data);
    this.states = [{name: 'TO BE APPROVED'},{name: 'CLOSED'}];
    
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
    this.selectedClaim.status = this.selectedState.name ;
    this.userService.updateAssignClaim(this.selectedClaim).subscribe(resp => error = resp);
    this.claim = null;
    this.displayDialog = false;
    this.ngOnInit();
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
