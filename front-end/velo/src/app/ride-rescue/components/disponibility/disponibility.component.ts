import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../model/User';
import { Disponibility } from '../../model/Disponibility';
import { formatDate } from '@angular/common';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-disponibility',
  templateUrl: './disponibility.component.html',
  styleUrls: ['./disponibility.component.scss']
})
export class DisponibilityComponent implements OnInit {
   value: Date;
   dates: String[];
   userList: User[];
   currentUser = new User();

    events: any[];

    options: any;

  constructor(private userService : UserServiceService,private authserv:AuthenticationService) { }

  ngOnInit() {
    this.currentUser = this.authserv.getCurrentUser();
    this.userService.getAll().subscribe((data: User[])=>this.userList = data);
    //this.events = getCurrentUser()
    // dirty to be refactored when adding authentification
    this.userService.getUserDisp(this.currentUser).subscribe(events => {
      this.events = events.map((event) => {  event['backgroundColor'] = '#f4623a';
        return event}
    )})
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2020-07-23',
      header: {
          left: 'prev,next',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
      },
      editable: true,
      dateClick: (dateClickEvent) =>  {         // <-- add the callback here as one of the properties of `options`
          console.log("DATE CLICKED !!!");
        },

        eventClick: (eventClickEvent) => {
          console.log("EVENT CLICKED !!!");
        },

        eventDragStop: (eventDragStopEvent) => {
          console.log("EVENT DRAG STOP !!!");
          
        },

        eventDrop: (eventDropInfo) => {
          const { event } = eventDropInfo;
           console.log(event.start);
             this.dates = [];
            this.value = event.start;
            this.handleUpdate(event.id); 
            this.Onsub();
        }
  }
  }

  handleUpdate(id : number)
  {
    let disp = new Disponibility();
    let formattedDt = formatDate(this.value, 'yyyy-MM-dd', 'en_US')
    this.dates.push(formattedDt);
    console.log("data pushed");
    this.userList.forEach(element => {
      if (element.id == this.currentUser.id)
      {

        this.currentUser = element;

        disp.start = this.dates;
        disp.dispo_id = this.currentUser.id;
        disp.id = id;
        this.currentUser.disponibility = disp ;
      }
    });
  }
 //TO BE REFACTORED WHEN ADDING AUTHENTIFICATION
 Onsub()
 {
   let error = "";
   console.log(this.currentUser);
   this.userService.updateDisp(this.currentUser).subscribe(resp => error = resp.forname);
 }

}