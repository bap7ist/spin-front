import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private _user = new BehaviorSubject<User | null>(null);
  private _friend = new BehaviorSubject<User | null>(null);
  public readonly user$ = this._user.asObservable();
  public readonly friend$ = this._friend.asObservable();

  setUser(user: User) {
    this._user.next(user);
  }

  setFriend(friend: User) {
    this._friend.next(friend);
  }

  getUser() {
    return this._user.value;
  }

  getFriend() {
    console.log('friend from store', this._friend.value);
    
    return this._friend.value;
  }

  clearUser() {
    this._user.next(null);
  }

  clearFriend() {
    this._friend.next(null);
  }
}
