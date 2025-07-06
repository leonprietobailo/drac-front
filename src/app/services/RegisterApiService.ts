import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterApiService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiBaseUrl + '/users/register';

  getEmailExists(email: string) {
    return this.http.get(`${this.baseUrl}/email-registered/${email}`);
  }
}
