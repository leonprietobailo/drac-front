import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponseDto, LogoutResponseDto } from '../dto/response/login';
import { LoginRequestDto } from '../dto/request/login';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    this.verifyExpirancy();
  }
  private baseUrl = environment.apiBaseUrl + '/auth';

  requestLogin(payload: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.baseUrl}/login`, payload);
  }

  requestLogout(): Observable<LogoutResponseDto> {
    return this.http.get<LogoutResponseDto>(`${this.baseUrl}/logout`);
  }

  get isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  verifyExpirancy(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.loggedIn.next(false);
      return false;
    }

    try {
      const decoded = jwtDecode<JwtPayload & { exp?: number }>(token);
      const exp = decoded?.exp; // exp is in seconds (UNIX time)

      // If no exp is present, treat as invalid
      if (!exp) {
        localStorage.removeItem('token');
        this.loggedIn.next(false);
        return false;
      }

      const isExpired = Date.now() >= exp * 1000;

      if (isExpired) {
        // Token expired: clear storage and update state
        localStorage.removeItem('token');
        this.loggedIn.next(false);
        return false;
      }

      // Token valid
      this.loggedIn.next(true);
      return true;
    } catch {
      // Malformed/undecodable token: clear and mark as logged out
      localStorage.removeItem('token');
      this.loggedIn.next(false);
      return false;
    }
  }


}
