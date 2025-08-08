import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LoginResponseDto } from '../dto/response/login';
import { LoginRequestDto } from '../dto/request/login';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  constructor(private http: HttpClient) {}
  private baseUrl = environment.apiBaseUrl + '/auth/login';

  requestLogin(payload: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.baseUrl}`, payload);
  }

}
