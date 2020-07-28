import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ParkServiceService} from '../../park-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [MessageService]
})
export class ContactComponent implements OnInit {
  id: Number ;
  logiin: FormGroup;
  constructor(private formBuilder: FormBuilder, private auth: ParkServiceService, private router: Router,
              private route: ActivatedRoute , private messageService: MessageService) { }

  ngOnInit() {
    let idd = this.route.snapshot.paramMap.get('id');
    this.logiin = this.formBuilder.group({
      // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
      message: ['']
    });
    this.id = parseInt(idd) ;
  }
  onmessgage() {
    this.auth.Contatc(this.logiin.value, this.id)
      .subscribe(
        res1 => {
          if(res1["status"] === "OK") {
            this.messageService.add({severity:'success', summary: 'Success Message', detail:'Order submitted'});
          }else{
            alert("Error");
          }
        });
  }

}
