import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { LoginApiService } from '../../../../services/LoginApiService';
import { LogoutResponseStatus } from '../../../../dto/response/login';

@Component({
  selector: 'app-login-verification-dummy',
  imports: [],
  templateUrl: './login-verification-dummy.component.html',
  styleUrl: './login-verification-dummy.component.scss'
})
export class LoginVerificationDummyComponent implements OnInit {

  logoutResponse: string = ""

  verificationResult: boolean | null = null;

  constructor(private http: HttpClient, private api: LoginApiService) { }

  ngOnInit(): void {
    this.http.get(environment.apiBaseUrl + '/auth/verify').subscribe({
      next: () => {
        this.verificationResult = true;
      },
      error: () => {
        this.verificationResult = false;
      }
    })
  }

  logout() {
    this.api.requestLogout().subscribe({
      next: (response) => {
        this.logoutResponse = response.status.toString();
        localStorage.removeItem('token');
      }
    })
  }
}
