import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
 import { CategoryEntity } from '../models/Category';
import { StepEntity } from '../models/Step';


@Injectable()
export class StepService {
    private _todos = new BehaviorSubject<StepEntity[]>([]);
    private baseUrl = 'http://localhost:8000';
    private dataStore: { todos: StepEntity[] } = { todos: [] };
    readonly todos = this._todos.asObservable();

    constructor(private http: HttpClient) {
        this.getJSON().subscribe(data => {
            console.log(data);
           });
    }

    get todoso(): Observable<any> {
        return this._todos.asObservable();
    }

    loadAll() {
        this.http.get<StepEntity[]>(`${this.baseUrl}/getSteps`).subscribe(
            data => {
                this.dataStore.todos = data;
                this._todos.next(Object.assign({}, this.dataStore).todos);
            },
            error => console.log('Could not load todos.')
        );
        console.log(this.dataStore.todos[1] + "loading all")
    }

    public getJSON(): Observable<any> {
        return this.http.get(`${this.baseUrl}/getSteps`);
      }

      


  create(todo: StepEntity) {
    console.log(todo);
     this.http
      .post<StepEntity>(`${this.baseUrl}/createStep`, JSON.stringify(todo)).subscribe(
        data => {
          console.log(data)
          this.dataStore.todos.push(data);
          this._todos.next(Object.assign({}, this.dataStore).todos);
        },
        error => console.log('Could not create todo.')
      );
  }

// ====> DOES NOT WORK YET FIX BACK END 
  update(todo: StepEntity) {
    console.log(todo)
    this.http
      .put<StepEntity>(`${this.baseUrl}/updateAction/${todo.id}`, JSON.stringify(todo)).subscribe(
        data => {
          this.dataStore.todos.push(data);
          this._todos.next(Object.assign({}, this.dataStore).todos);
        },
        error => console.log('Could not create todo.')
      );
  }

  remove(todoId: number) {
    this.http.delete(`${this.baseUrl}/deleteStep/${todoId}`).subscribe(
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



      buildStep(data): StepEntity {
        let categoryStructure: StepEntity = new StepEntity();
        let localData:any;
        if(typeof data.step != 'undefined' || data.step != null){
            localData = data.step;
            console.log(data);
        } else {
            localData = data;
            console.log(data);
            
        }
        console.log("CREATING STEP .............")
        categoryStructure.id = localData.id != null ? localData.id : null;
        categoryStructure.title = localData.title != null ? localData.title : false;
        categoryStructure.location_start = localData.location_start != null ? localData.location_start : false;
        categoryStructure.location_end = localData.location_end != null ? localData.location_end : false;
        categoryStructure.start_day = localData.start_day != null ? localData.start_day : false;
        categoryStructure.end_day = localData.end_day != null ?  localData.end_day : false;
        categoryStructure.rep = localData.rep != null ? localData.rep  : false;
        categoryStructure.end_repeat = localData.end_repeat != null ?  localData.end_repeat  : false;
        categoryStructure.gender = localData.gender != null ? localData.gender : false;
        categoryStructure.age = localData.age != null ? localData.age : false;
        categoryStructure.theme = localData.theme != null ?  localData.theme : false;
        categoryStructure.diagrame = localData.diagrame != null ? localData.diagrame : false;
        categoryStructure.difficulty = localData.difficulty != null ? localData.difficulty : false;
        categoryStructure.rule = localData.rule != null ? localData.rule : false;
        categoryStructure.association_name = localData.association_name != null ? localData.association_name : false;
        console.log("STEP  CREATED ............." + categoryStructure);
        
         return categoryStructure;
      }
      
}


