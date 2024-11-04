import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { UserStore } from '../stores/user.store';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<User> {
  constructor(private userService: UserService, private userStore: UserStore) {}

  resolve(): Observable<User> {
    return this.userService.getCurrentUser().pipe(
      tap((user) => this.userStore.setUser(user)),
      catchError((error) => {
        console.error('Erreur lors du chargement du profil:', error);
        return EMPTY;
      })
    );
  }
}
