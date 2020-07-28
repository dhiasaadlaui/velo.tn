import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ParkServiceService} from '../../park-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [MessageService]
})
export class ReservationComponent implements OnInit {
  logiin: FormGroup;
  id: Number ;
  prix: any ;
  constructor(private formBuilder: FormBuilder, private auth: ParkServiceService, private router: Router,
              private route: ActivatedRoute , private messageService: MessageService) { }

  ngOnInit() {
    let idd = this.route.snapshot.paramMap.get('id');
    let prixx = this.route.snapshot.paramMap.get('prix');
    this.logiin = this.formBuilder.group({
      // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
      DateDebut: [''],
      // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
      DateFin: [''],
      nbrplaces: ['']
    });
    this.id = parseInt(idd) ;
    this.prix = parseInt(prixx) ;
    console.log(this.id);
  }
  onReserver() {

    /****/
    if(this.logiin.value.DateDebut < this.logiin.value.DateFin) {
      const diffInMs = Date.parse(this.logiin.value.DateFin) - Date.parse(this.logiin.value.DateDebut);
      const diffInHours = diffInMs / 1000 / 60 / 60;
      const Prixtotal = this.prix * diffInHours * parseInt(this.logiin.value.nbrplaces) ;
      this.messageService.clear();
      this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
      
      var r = confirm("Confirmer votre réservation ? \n" +
        "Prix de réservation : "+Prixtotal+" TND");

      if (r == true) {
        this.auth.reserverOffer(this.logiin.value, this.id, 1,Prixtotal)
          .subscribe(
            res1 => {
              console.log(res1["status"]);
              if(res1["status"] === "OK") {
                alert("Done");
              }else{
                alert("Pleine");
              }
            });
      } else {
        console.log("You pressed Cancel!");
      }
    }

  }

}
