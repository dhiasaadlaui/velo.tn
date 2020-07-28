import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
     }

    login(login: string, password: string) {
        return this.http.post<any>("http://localhost/BackendSF/web/app_dev.php/getcredential/"+login+"/"+password, { login, password })
            .pipe(map(user => {
                // login successful if there's a user in the response
                if (user) {
                    // store user details and basic auth credentials in local storage 
                    // to keep user logged in between page refreshes
                    this.currentUser = user[0];
                    user.authdata = window.btoa(login + ':' + password); // BASE64 ENCODING
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    console.log(this.currentUser);
                }

                return user;
            }));
    }
    loginAdmin(login: string, password: string) {
        return this.http.post<any>("http://localhost/BackendSF/web/app_dev.php/getadmin/"+login+"/"+password, { login, password })
            .pipe(map(user => {
                // login successful if there's a user in the response
                if (user) {
                    // store user details and basic auth credentials in local storage 
                    // to keep user logged in between page refreshes
                    this.currentUser = user[0];
                    user.authdata = window.btoa(login + ':' + password); // BASE64 ENCODING
                    localStorage.setItem('currentUserAdmin', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    console.log(this.currentUser);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
        
   public get getCurrentUser(): User{
         return this.currentUserSubject.value[0];
      }
}