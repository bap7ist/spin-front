import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { User, UserUpdate } from '../models/user.model';
import { Interest } from '../models/interest.model';
import { GradientOption } from './gradient.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpService) {}

  private endpoint = '/profiles';

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.endpoint}/me`);
  }

  updateProfile(userData: UserUpdate): Observable<User> {
    return this.http.put<User>(`${this.endpoint}/me`, userData);
  }

  updateAvatar(file: File): Observable<User> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http.patch<User>(`${this.endpoint}/me/avatar`, formData);
  }

  removeAvatar(): Observable<User> {
    return this.http.delete<User>(`${this.endpoint}/me/avatar`);
  }

  updateInterests(interests: Interest[]): Observable<User> {
    return this.http.put<User>(`${this.endpoint}/me/interests`, {
      interests,
    });
  }

  updateGradient$(gradient: GradientOption): Observable<User> {
    return this.http.put<User>(`${this.endpoint}/me/gradient`, gradient);
  }
}
