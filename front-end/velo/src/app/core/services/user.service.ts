import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _authService: AuthenticationService
  ) { }




  getCurrentUser(): User {
    return { username: JSON.parse(localStorage.getItem('currentUser'))[0].login };
  }

  getCurrentRoles() {
    return ['admin', 'user', 'guest'];
  }

  getUserPoints(): number {
    return JSON.parse(localStorage.getItem('currentUser'))[0].points;
  }
}

export interface User {
  username: string;
}