import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-login-verification-dummy',
  imports: [],
  templateUrl: './login-verification-dummy.component.html',
  styleUrl: './login-verification-dummy.component.scss'
})
export class LoginVerificationDummyComponent implements OnInit {

  verificationResult: boolean | null = null;

  constructor(private http: HttpClient) { }

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
}
