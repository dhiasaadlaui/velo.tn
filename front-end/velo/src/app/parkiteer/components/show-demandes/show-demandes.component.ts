import { Component, OnInit } from '@angular/core';
import { ParkServiceService} from '../../park-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-demandes',
  templateUrl: './show-demandes.component.html',
  styleUrls: ['./show-demandes.component.css']
})
export class ShowDemandesComponent implements OnInit {
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
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.auth.getdemandes()
      .subscribe(
        res1 => {
          let i = 0 ;
          while (i < res1["Demande"].length) {
            this.data.push(res1["Demande"][i]);
            this.rows = this.data ;
            i++;
          }
          console.log(this.data);
        });
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
  open(idd) {
    this.router.navigate(['/parkiteer/AddContact', { id: idd} ]);

  }
  show(idd){
    this.router.navigate(['/parkiteer/showContact', { id: idd} ]);
  }

}
