import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TotpRequestDto, UserRequestDto } from '../dto/request/register';
import {
  TotpResponseDto,
  UserResponseDto,
  UserResponseStatus,
} from '../dto/response/register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterApiService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiBaseUrl + '/users/register';

  requestEmailExists(email: string) {
    return this.http.get(`${this.baseUrl}/email-registered/${email}`);
  }

  requestTotp(payload: TotpRequestDto): Observable<TotpResponseDto> {
    return this.http.post<TotpResponseDto>(`${this.baseUrl}/totp`, payload);
  }

  requestRegister(payload: UserRequestDto): Observable<UserResponseDto> {
    return this.http.post<UserResponseDto>(`${this.baseUrl}/persist`, payload);
  }
}
