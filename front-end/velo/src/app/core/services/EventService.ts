import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { EventEntity } from '../models/Event';
 
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

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
        console.log(data);
       });
  }

  get todoso() : Observable<any>{
    return this._todos.asObservable();
  }

  loadAll() {
    this.http.get<EventEntity[]>(`${this.baseUrl}/getEvents`).subscribe(
      data => {
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
        let notFound = true;

        this.dataStore.todos.forEach((item, index) => {
          if (item.start_date === data.start_date) {
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
    return this.dataStore.todos[id];
  }

  find(id: number | string) {
    this.loadAll();
    this.load(id);
    console.log("load and find workd" + this.dataStore.todos[id] + id)
    return this.dataStore.todos[id];
  }




  create(todo: EventEntity) {
  
  }


  update(todo: EventEntity) {
    console.log(todo)
    this.http
      .put<EventEntity>(`${this.baseUrl}/update/${todo.id}`, JSON.stringify(todo)).subscribe(
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
  buildEvent(data) : EventEntity{
    let event:EventEntity = new EventEntity();
     console.log(data.locationSart)
     event.id = data.id;
     event.location = data.location;
     event.start_date = data.start_date;
     event.end_date = data.end_date;
     event.event_name = data.event_name;
     event.distance = data.distance;
     event.is_theme = false;
     return event;
    }
}

  
