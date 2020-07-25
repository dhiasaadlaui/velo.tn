import { Component, OnInit } from '@angular/core';
import { Markers } from '../../model/Markers';
import { Claim } from '../../model/Claim';
import { FormGroup, FormControl } from '@angular/forms';
import "./gmapdefinitions";
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../model/User';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit {

   options: any;
   dialogVisible: boolean;
   selectedPosition: any;
   overlays: any[];
   markerTitle: string;
   draggable: boolean;
   claim = new Claim() ;
   marker = new Markers() ;
   claimForm = new FormGroup({'title': new FormControl(''),'subject': new FormControl(''),
   'level': new FormControl(''),'markertitle': new FormControl(''),'lat': new FormControl(''),
   'lng': new FormControl(''),'phone': new FormControl('')
  });
  constructor(private userService : UserServiceService) {
   }

   userList: User[];
   currentUser = new User();

  ngOnInit() {
    this.claim.status = "PENDING";
    this.draggable = false;
    this.overlays = [];
    this.options = {
      center: {lat: 36.816609, lng: 10.173111},
      zoom: 12
        };
   this.userService.getAll().subscribe((data: User[])=>this.userList = data);
  }

  Onsub()
  {
    this.claim.level = this.claimForm.value['level'] ;
    this.claim.subject = this.claimForm.value['subject'] ;
    this.claim.title = this.claimForm.value['title'] ;
    this.marker.address = this.claimForm.value['markertitle'];
    this.marker.name = this.claimForm.value['markertitle'];
    this.marker.lng = this.claimForm.value['lat'];
    this.marker.lat = this.claimForm.value['lng'];
    this.claim.marker = this.marker;
    this.claim.phone = this.claimForm.value['phone'];
    this.claimForm.reset();
    this.overlays = []; 
    
    console.log(this.claim);
    let error = "";
    this.claim.user = this.userList[3] ;
    this.userService.addClaim(this.claim).subscribe(resp => error = resp.status);
    console.log(error);
   
  }

  handleMapClick(event) {
    this.dialogVisible = true;
    this.selectedPosition = event.latLng;
}

  addMarker() {
  this.overlays = []; 
  this.overlays.push(new google.maps.Marker({position:{lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng()}, title:this.markerTitle, draggable: this.draggable}));
  this.dialogVisible = false;
}

}
