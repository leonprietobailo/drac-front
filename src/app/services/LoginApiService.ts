import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LoginResponseDto, LogoutResponseDto } from '../dto/response/login';
import { LoginRequestDto } from '../dto/request/login';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  constructor(private http: HttpClient) { }
  private baseUrl = environment.apiBaseUrl + '/auth';

  requestLogin(payload: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.baseUrl}/login`, payload);
  }

  requestLogout(): Observable<LogoutResponseDto> {
    return this.http.get<LogoutResponseDto>(`${this.baseUrl}/logout`);
  }

}
