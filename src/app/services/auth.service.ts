import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, tap} from 'rxjs';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  private baseUrl = "http://localhost:8080/api/auth";

  loadedUser = new BehaviorSubject<User>(null);

  login(model : any)
  {
    return this.http.post<User>(this.baseUrl + "/login", model).pipe(
      tap(
        res => {
          this.setCurrentUser(res);
        },
      )
    );
  }


  autoLogin()
  {
    const user = localStorage.getItem('user');

    if (user) {
      const userObj = JSON.parse(user);
      this.loadedUser.next(userObj);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.loadedUser.next(null);
    window.location.href = '/auth/login';
  }


  register(model : any) {
    return this.http.post<User>(this.baseUrl + "/register", model).pipe(
      tap(
        res => {
          console.log(res);
          
          this.setCurrentUser(res);
        },
      )
    );
  }

  setCurrentUser(user : User) {
    this.loadedUser.next(user);
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
  }


}
