import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { TokenService } from './token.service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginData, LoginResponse, RegisterData, RegisterResponse } from '../models/auth.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpService,
    private tokenService: TokenService,
    private router:Router
  ) {}

  register(userData: RegisterData): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('/auth/register', userData);
  }

  login(credentials: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/auth/login', credentials).pipe(
      tap(response => {
        if (response.token) {
          this.tokenService.setToken(response.token);
        }
      })
    );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.tokenService.hasToken();
  }
}
