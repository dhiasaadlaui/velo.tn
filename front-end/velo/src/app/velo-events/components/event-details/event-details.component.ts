import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/core/services/EventService';
import { element } from 'protractor';
import { EventEntity } from 'src/app/core/models/Event';
import { map, filter } from 'rxjs/operators';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit,OnDestroy {
  event: EventEntity;
  event$: Observable<EventEntity[]>;
  subscription:any;
  constructor(private router: ActivatedRoute, private eventService: EventService) { }




  ngOnInit() {
     this.event$ = this.eventService.todos;
    /*this.eventService.todos.subscribe((element : EventEntity[]) => {
      let id:number = (+this.router.snapshot.params['id']);
      console.log(id);
      
      this.event = this.eventService.find(id);
      console.log(this.event)
    });*/
    this.subscription = this.eventService.todos.subscribe(x =>  x.forEach(e => {
      if(e.id == (+this.router.snapshot.params['id'])){
        this.event = new EventEntity();
        this.event = e;
      }
    }));
    this.eventService.loadAll()
    /*const subscription3 = this.eventService.todos.pipe(
      map(value => value),
      filter(value => value % 2 === 0)
    ).subscribe(value => console.log(value));*/
    
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
