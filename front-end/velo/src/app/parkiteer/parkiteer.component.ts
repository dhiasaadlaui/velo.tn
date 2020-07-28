import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ParkServiceService} from './park-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-parkiteer',
  templateUrl: './parkiteer.component.html',
  styleUrls: ['./parkiteer.component.scss'],
  providers: [MessageService]
})
export class ParkiteerComponent implements OnInit {
  logiin: FormGroup;
  constructor(private formBuilder: FormBuilder, private auth: ParkServiceService , private messageService: MessageService) {
  }

  ngOnInit() {
    this.logiin = this.formBuilder.group({
      // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
      nbrplaces: [null],
      // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
      prix: [''],
      numtel: [''],
      email: [''],
      localisation: [''],
      type: [''],
      preferences: ['']
    });
  }
  onLogin() {
    console.log(this.logiin.value);
    this.auth.addOffer(this.logiin.value)
      .subscribe(res => {
        if(res["status"] === "OK") {
          
            this.messageService.add({severity:'success', summary: 'Success Message', detail:'Order submitted'});
            
        
        }else{
          alert("Error");
        }
        // console.log('this.router.navigate');
        // console.log(res)
      });
    }

}
