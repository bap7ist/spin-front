import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private _user = new BehaviorSubject<User | null>(null);
  public readonly user$ = this._user.asObservable();

  setUser(user: User) {
    this._user.next(user);
  }

  getUser() {
    return this._user.value;
  }

  clearUser() {
    this._user.next(null);
  }
}
