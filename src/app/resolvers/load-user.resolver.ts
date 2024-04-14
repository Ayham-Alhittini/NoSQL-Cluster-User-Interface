import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoadUserResolver implements Resolve<User> {
  constructor(private accountService: AuthService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.accountService.loadedUser.pipe(take(1));
  }
}
