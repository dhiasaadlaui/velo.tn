import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }




  getCurrentUser(): User {
    return { username: 'admin' };
  }

  getCurrentRoles() {
    return ['admin', 'user', 'guest'];
  }
}

export interface User {
  username: string;
}