import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
 import { CategoryEntity } from '../models/Category';


@Injectable()
export class CategoryService {
    private _todos = new BehaviorSubject<CategoryEntity[]>([]);
    private baseUrl = 'http://localhost:8000';
    private dataStore: { todos: CategoryEntity[] } = { todos: [] };
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
}


