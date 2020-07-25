import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
 import { EventConfig } from '../models/EventConfig';
import { EventEntity } from '../models/Event';

export interface Todo {
  id?: any;
  createdAt?: number;
  value: string;
}

@Injectable()
export class EventConfigService {
  private _todos = new BehaviorSubject<EventConfig[]>([]);
  private baseUrl = 'http://localhost:8000';
  public dataStore: { todos: EventConfig[] } = { todos: [] };
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
    this.http.get<EventConfig[]>(`${this.baseUrl}/config/getConfigs`).subscribe(
      data => {
        this.dataStore.todos = data;
        this._todos.next(Object.assign({}, this.dataStore).todos);
      },
      error => console.log('Could not load todos.')
    );
  }

  public getJSON(): Observable<any> {
    return this.http.get(`${this.baseUrl}/config/getConfigs`);
  }

  load(id: number | string) {
    this.http.get<EventConfig>(`${this.baseUrl}/config/getConfig/${id}`).subscribe(
      data => {
        let notFound = true;

        this.dataStore.todos.forEach((item, index) => {
          if (item.rep === data.rep) {
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
    console.log('config work fine ' +  this.dataStore.todos[id])
    return this.dataStore.todos[id];
  }

  find(id: number | string) {
    this.load(id);
    return this.dataStore.todos[id];
  }




  create(todo: EventConfig) {
    this.http
      .put<EventConfig>(`${this.baseUrl}/putConf`, JSON.stringify(todo)).subscribe(
        data => {
          this.dataStore.todos.push(data);
          this._todos.next(Object.assign({}, this.dataStore).todos);
        },
        error => console.log('Could not create todo.')
      );
  }

  createEventConfig(todo: EventConfig) {
    this.http
      .post<EventConfig>(`${this.baseUrl}/config/createConfig`, JSON.stringify(todo)).subscribe(
        data => {
          this.dataStore.todos.push(data);
          this._todos.next(Object.assign({}, this.dataStore).todos);
        },
        error => console.log('Could not create todo.')
      );
  }



}

  
