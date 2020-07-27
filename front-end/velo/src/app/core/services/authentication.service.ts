import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/User';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUser : User;
    constructor(private http: HttpClient) { }

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
                   
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
        
    getCurrentUser(): User {
        return this.currentUser;
      }
}