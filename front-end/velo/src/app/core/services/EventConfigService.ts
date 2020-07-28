import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
 import { EventConfig } from '../models/EventConfig';
import { EventEntity } from '../models/Event';
import { NodeEventEntity } from '../models/NodeEvent';
import { ConnectorEntity } from '../models/Connector';

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

  private _todosNode = new BehaviorSubject<NodeEventEntity[]>([]);
  private baseUrlNode = 'http://localhost:8000';
  public dataStoreNode: { todosNode: NodeEventEntity[] } = { todosNode: [] };
  readonly todosNode = this._todosNode.asObservable();

  private _todosConnector= new BehaviorSubject<ConnectorEntity[]>([]);
  private baseUrlConnector = 'http://localhost:8000';
  public dataStoreConnector: { todosConnector: ConnectorEntity[] } = { todosConnector: [] };
  readonly todosConnectore = this._todosConnector.asObservable();

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

  createNode(todo: NodeEventEntity) {
    this.http
      .post<NodeEventEntity>(`${this.baseUrlNode}/createNode`, JSON.stringify(todo)).subscribe(
        data => {
          this.dataStoreNode.todosNode.push(data);
          this._todosNode.next(Object.assign({}, this.dataStoreNode).todosNode);
        },
        error => console.log('Could not create todo.')
      );
  }

  createConnector(todo: ConnectorEntity) {
    this.http
      .post<ConnectorEntity>(`${this.baseUrlConnector}/createConnector`, JSON.stringify(todo)).subscribe(
        data => {
          console.log("NODE CREATED SUCCESS.........................");
          console.log(data);
          
          this.dataStoreConnector.todosConnector.push(data);
          this._todosConnector.next(Object.assign({}, this.dataStoreConnector).todosConnector);
        },
        error => console.log('Could not create todo.')
      );
  }
  

  createEventConfig(todo: EventConfig) {
    this.http
      .post<EventConfig>(`${this.baseUrl}/config/createConfig`, JSON.stringify(todo)).subscribe(
        data => {
          console.log("Connector CREATED SUCCESS.........................");
          console.log(data);
          this.dataStore.todos.push(data);
          this._todos.next(Object.assign({}, this.dataStore).todos);
        },
        error => console.log('Could not create todo.')
      );
  }

  buildEventConfig(data): EventConfig {
    let eventConfig: EventConfig = new EventConfig();
    let localData:any;
    if(typeof data.event_config != 'undefined' || data.event_config != null){
        localData = data.event_config;
        console.log(data);
    } else {
        localData = data;
        console.log(data);
        
    }
    console.log("CREATING STEP .............")
    eventConfig.id = data.event_config_id ? data.event_config_id : null;
    eventConfig.location_start = localData.location_start ;
    eventConfig.location_end = localData.location_end;
    eventConfig.start_day = localData.start_day;
    eventConfig.end_day = localData.end_day ;
    eventConfig.rep = localData.rep ;
    eventConfig.end_repeat = "localData.end_repeat" ;
    eventConfig.gender = "localData.gender" ;
    eventConfig.age = "localData.age ";
    eventConfig.is_theme = "localData.is_theme" ;
    eventConfig.difficulty = localData.difficulty;
    eventConfig.rule = localData.rule;
    eventConfig.association_name = localData.association_name ;
    console.log("CONFIG  CREATED ............." );
    console.log(eventConfig);
    console.log("CONFIG  CREATED ............." );

    
     return eventConfig;
  }


}

  
