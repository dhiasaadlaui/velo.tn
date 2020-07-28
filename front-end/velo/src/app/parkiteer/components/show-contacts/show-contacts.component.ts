import { Component, OnInit } from '@angular/core';
import { ParkServiceService} from '../../park-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-contacts',
  templateUrl: './show-contacts.component.html',
  styleUrls: ['./show-contacts.component.scss']
})
export class ShowContactsComponent implements OnInit {
  id: Number ;
  data = [];
  rows = [];
  columns = [
    { prop: 'Message' },
    { prop: 'Date' }
  ];
  constructor(private auth: ParkServiceService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let idd = this.route.snapshot.paramMap.get('id');
    this.id = parseInt(idd) ;
    this.auth.getContacts(this.id)
      .subscribe(
        res1 => {
          console.log(res1);
          let i = 0 ;
          while (i < res1["contact"].length) {
            this.data.push(res1["contact"][i]);
            this.rows = this.data ;
            i++;
          }

        });

  }

}
