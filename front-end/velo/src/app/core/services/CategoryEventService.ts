import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
 import { CategoryEntity } from '../models/Category';
import { StepEntity } from '../models/Step';
import { StepService } from './StepService';


@Injectable()
export class CategoryEventService {
    private _todos = new BehaviorSubject<CategoryEntity[]>([]);
    private baseUrl = 'http://localhost:8000';
    private dataStore: { todos: CategoryEntity[] } = { todos: [] };
    readonly todos = this._todos.asObservable();

    constructor(private http: HttpClient, private stepSerivce:StepService) {
        this.getJSON().subscribe(data => {
            console.log(data);
           });
    }

    get todoso(): Observable<any> {
        return this._todos.asObservable();
    }

    loadAll() {
        this.http.get<CategoryEntity[]>(`${this.baseUrl}/getCategories`).subscribe(
            data => {
                this.dataStore.todos = data;
                this._todos.next(Object.assign({}, this.dataStore).todos);
            },
            error => console.log('Could not load todos.')
        );
        console.log(this.dataStore.todos[1] + "loading all")
    }

    public getJSON(): Observable<any> {
        return this.http.get(`${this.baseUrl}/getCategories`);
      }

      
      load(id: number | string) {
        this.http.get<CategoryEntity>(`${this.baseUrl}/getCategory/${id}`).subscribe(
          data => {
            console.log("DATA ONE FOUND ..............................")
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

  create(todo: any) {
      console.log(todo);
      
    console.log(todo);
     this.http
      .post<any>(`${this.baseUrl}/createCategory`, JSON.stringify(todo)).subscribe(
        data => {
          console.log(data)
          this.dataStore.todos.push(data);
          this._todos.next(Object.assign({}, this.dataStore).todos);
          console.log(data)
        },
        error => console.log('Could not create todo.')
      );
  }


  update(todo: CategoryEntity) {
    console.log("TO BE UPDATED CATEGORY ..................................")
    console.log(todo);
    console.log("TO BE UPDATED CATEGORY ..................................")

    this.http
      .put<CategoryEntity>(`${this.baseUrl}/updateCategory/${todo.id}`, JSON.stringify(todo)).subscribe(
        data => {
          console.log(data);
          
          this.dataStore.todos.push(data);
          this._todos.next(Object.assign({}, this.dataStore).todos);
        },
        error => console.log('Could not create todo.')
      );
  }

  remove(todoId: number) {
    this.http.delete(`${this.baseUrl}/deleteCategory/${todoId}`).subscribe(
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



      buildCategory(data): CategoryEntity {
        let category: CategoryEntity = new CategoryEntity();

        category.id = data.id != null ? data.id : null;
        category.category_name = data.category_name;
        category.category_img = data.category_img;
        category.step = this.stepSerivce.buildStep(data);
         return category;
      }
      
}


