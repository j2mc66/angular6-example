import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public baseUrl: string = 'http://localhost:8090/';
  public apiUsers: string = this.baseUrl + 'users';

  getUsers() {    
    return this.http.get<User[]>(this.apiUsers);    
  }

  getUserById(id: number) {
    return this.http.get<User>(this.apiUsers + '/' + id);
  }

  createUser(user: User) {
    return this.http.post(this.apiUsers, user);
  }

  updateUser(user: User) {
    return this.http.put(this.apiUsers + '/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.apiUsers + '/' + id);
  }
}
