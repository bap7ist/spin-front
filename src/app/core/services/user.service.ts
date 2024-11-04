import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpService) {}

  private endpoint = '/profiles';

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.endpoint}/me`);
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.endpoint}/me`, userData);
  }

  updateAvatar(file: File): Observable<User> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http.patch<User>(`${this.endpoint}/me/avatar`, formData);
  }

  removeAvatar(): Observable<User> {
    return this.http.delete<User>(`${this.endpoint}/me/avatar`);
  }
} 