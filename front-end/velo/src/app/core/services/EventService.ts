import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { EventEntity } from '../models/Event';
import { UserService } from './user.service';
import { AuthenticationService } from './authentication.service';
import { EventConfigService } from './EventConfigService';
import { data } from 'jquery';

export interface Todo {
  id?: any;
  createdAt?: number;
  value: string;
}

@Injectable()
export class EventService {
  private _todos = new BehaviorSubject<EventEntity[]>([]);
  private baseUrl = 'http://localhost:8000';
  private dataStore: { todos: EventEntity[] } = { todos: [] };
  readonly todos = this._todos.asObservable();

  constructor(private http: HttpClient, private userService: AuthenticationService, private confService:EventConfigService) {
  }

  get todoso(): Observable<any> {
    return this._todos.asObservable();
  }

  loadAll() {
    this.http.get<EventEntity[]>(`${this.baseUrl}/getEvents`).subscribe(
      data => {
        console.log(data)
        this.dataStore.todos = data;
        this._todos.next(Object.assign({}, this.dataStore).todos);
      },
      error => console.log('Could not load todos.')
    );
    console.log(this.dataStore.todos[1] + "loading all")
  }

  public getJSON(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getEvents`);
  }

  load(id: number | string) {
    this.http.get<EventEntity>(`${this.baseUrl}/getEvent/${id}`).subscribe(
      data => {
        console.log(data)
        let notFound = true;

        this.dataStore.todos.forEach((item, index) => {
          if (item.id == data.id) {
            this.dataStore.todos[index] = data;
            notFound = false;
          }
        });

        if (notFound) {
          this.dataStore.todos.push(data);
        }

        this._todos.next(Object.assign({}, this.dataStore).todos);
      },
      error => console.log('Could not load todo.')
    );
  }

  find(id: number | string) {
   this.dataStore.todos.find(el => el.id == id);
    this.load(id);
    console.log("load and find workd" + this.dataStore.todos[id] + id)
    return this.dataStore.todos[id];
  }




  create(todo: EventEntity) {
    let eventEtity:EventEntity;
    console.log(todo);
     this.http
      .post<EventEntity>(`${this.baseUrl}/createEvent`, JSON.stringify(todo)).subscribe(
        data => {
          eventEtity = data;
          console.log(data)
          this.dataStore.todos.push(data);
          this._todos.next(Object.assign({}, this.dataStore).todos);
        },
        error => console.log('Could not create todo.')
      );
      return eventEtity;
  }

  createEventNodeSubscription(todo: EventEntity){
    return this.http
      .post<EventEntity>(`${this.baseUrl}/createEvent`, JSON.stringify(todo))
  }

  update(todo: EventEntity) {
    console.log(todo)
    this.http
      .put<EventEntity>(`${this.baseUrl}/updateEvent/${todo.id}`, JSON.stringify(todo)).subscribe(
        data => {
          this.dataStore.todos.push(data);
          this._todos.next(Object.assign({}, this.dataStore).todos);
        },
        error => console.log('Could not create todo.')
      );
  }

  remove(todoId: number) {
    this.http.delete(`${this.baseUrl}/deleteEvent/${todoId}`).subscribe(
      response => {
        this.dataStore.todos.forEach((t, i) => {
          if (t.id === todoId) {
            this.dataStore.todos.splice(i, 1);
          }
        });

        this._todos.next(Object.assign({}, this.dataStore).todos);
      },
      error => console.log('Could not delete todo.')
    );
  }

  archiver(event: EventEntity) {
    event.is_archived = !event.is_archived;
    console.log(event.is_archived)
    this.update(event);
  }


  buildEvent(data): EventEntity {
    let event: EventEntity = new EventEntity();
    event.id = data.id != null ? data.id : null;
    event.location = data.location;
    event.start_date = data.start_date;
    event.end_date = data.end_date;
    event.event_name = data.event_name;
    event.distance = 1000;
    event.is_theme = false;
    event.is_archived = data.is_archived;
    event.rate = 1000;
    event.creator_user_id = this.userService.getCurrentUser.name;
    return event;
  }

  //for test purpose 
  buildEventTest(data): EventEntity {
    let event: EventEntity = new EventEntity();
    event.id = typeof data.id === 'undefined' ? null : data.id ;
    event.location = data.event_name;
    event.start_date = data.start_day;
    event.end_date = data.end_day;
    event.event_name = data.event_name;
    event.distance = 1000;
    event.is_theme = false;
    event.is_archived = false;
    event.rate = 1000;
    event.category = data.category;
    event.creator_user_id = this.userService.getCurrentUser.name;
    event.event_config = this.confService.buildEventConfig(data);
    console.log("CREATING EVENT .................");
    console.log(event);
    console.log("CREATING EVENT .................");
    return event;
  }
}


