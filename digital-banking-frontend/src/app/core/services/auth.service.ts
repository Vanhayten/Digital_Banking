import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface AuthStatus {
  isAuthenticated: boolean;
  user?: any;
  token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/auth';
  private authStatusSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<any>(null);

  // Public observables
  public isAuthenticated$ = this.authStatusSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.authStatusSubject.next(true);
      this.loadCurrentUser();
    }
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
          this.authStatusSubject.next(true);
          this.currentUserSubject.next(response.user);
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  register(userData: RegisterRequest): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userData).pipe(
      catchError(error => {
        console.error('Registration error:', error);
        throw error;
      })
    );
  }

  logout(): Observable<any> {
    return of(null).pipe(
      tap(() => {
        localStorage.removeItem('auth_token');
        this.authStatusSubject.next(false);
        this.currentUserSubject.next(null);
      })
    );
  }

  getCurrentUser(): Observable<any> {
    if (this.currentUserSubject.value) {
      return of(this.currentUserSubject.value);
    }

    return this.http.get(`${this.API_URL}/me`).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
      }),
      catchError(error => {
        console.error('Error getting current user:', error);
        return of(null);
      })
    );
  }

  private loadCurrentUser(): void {
    this.getCurrentUser().subscribe();
  }

  // Method for auth interceptor
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return this.authStatusSubject.value;
  }
}
