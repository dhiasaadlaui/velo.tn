import { Component, OnInit } from '@angular/core';
import { ParkServiceService} from '../../park-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-show-offers',
  templateUrl: './show-offers.component.html',
  styleUrls: ['./show-offers.component.css'],
  providers: [MessageService]
})
export class ShowOffersComponent implements OnInit {
  data = [];
  rows = [];
  columns = [
    { prop: 'Nombre des places' },
    { prop: 'Prix' },
    { prop: 'Numéro téléphone'},
    { prop: 'Email'},
    { prop: 'Localisation'},
    { prop: 'Type'},
    { prop: 'Préférences'},
  ];
  constructor(private auth: ParkServiceService, private router: Router,
              private route: ActivatedRoute , private messageService: MessageService) { }
  open(idd,prixx) {
    this.router.navigate(['/parkiteer/reserver', { id: idd, prix: prixx} ]);
    /**this.auth.reserverOffer(id, 1)
      .subscribe(
        res1 => {
          console.log(res1);
        });**/
  }
  delete(id) {
    this.auth.deleteOffer(id)
      .subscribe(
        res1 => {
          if(res1["status"] === "OK") {
            alert("Done");
          }else{
            alert("Error");
          }
        });
  }
  ngOnInit() {
    this.auth.getOffer()
      .subscribe(
        res1 => {
          let i = 0 ;
          while (i < res1["Offres"].length) {
            console.log(res1["Offres"][i].signaler)
           if ((parseInt(res1["Offres"][i].signaler)) < 5) {
              this.data.push(res1["Offres"][i]);
              this.rows = this.data;

            }
            i++;
          }

          console.log(this.data);
        });
  }
  signaler(id) {
    this.auth.signalerOffer(id)
      .subscribe(
        res1 => {
          if(res1["status"] === "OK") {
            this.messageService.clear();
            this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
          }else{
            alert("Error");
          }
        });
  }

}
