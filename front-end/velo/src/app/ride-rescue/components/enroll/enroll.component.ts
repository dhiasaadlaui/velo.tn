import { Disponibility } from './../../model/Disponibility';
import { User } from './../../model/User';
import { UserServiceService } from './../../services/user-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss']
})
export class EnrollComponent implements OnInit {

  userList: User[];
  isVolunteer: boolean;
  currentUser = new User();
  volunteerForm = new FormGroup({'date': new FormControl('')
  });
  value: Date;
  dates: String[];
  constructor(private userService : UserServiceService) { }

  ngOnInit() {
    this.isVolunteer = false;
    this.dates = [];
    this.value = new Date();
    this.currentUser.id = 4;
    this.userService.getAll().subscribe((data: User[])=>this.userList = data);
  }

  Onsub()
  {
    let error = "";
    this.currentUser.name = "Zama9tél" ;
    console.log(this.currentUser);
    this.userService.enroll(this.currentUser).subscribe(resp => error = resp.forname);
  }
  AddDate()
  {
    let formattedDt = formatDate(this.value, 'yyyy-MM-dd', 'en_US')
    this.dates.push(formattedDt);
    console.log("data pushed");
    
    if(this.isVolunteer)
    {
        console.log("rdy to update users disponibility")
    }else {
      console.log("adding the user disponibility")
     let disp = new Disponibility();
      
    this.dates.forEach(element => {
      console.log("choosen dates"+element);
    }); // to be removed 

    this.userList.forEach(element => {
      if (element.id == this.currentUser.id)
      {

        this.currentUser = element;

        disp.start = this.dates;
        disp.dispo_id = this.currentUser.id;
        this.currentUser.disponibility = disp ;
    
        
      }
    }); // to be refactored when adding Authentification Module (dirty Patch)
    
    console.log(this.currentUser);
  }
   
  }
  resetDate()
  {
    this.dates = [];
  }

}
