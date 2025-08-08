import { Component } from '@angular/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { LoginApiService } from '../../../services/LoginApiService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-card',
  imports: [
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
  ],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.scss',
})
export class LoginCardComponent {
  usernameValue: string = "";
  passwordValue: string = "";
  wrongUser: boolean = false;
  loginSuccess: boolean = false;

  constructor(private api: LoginApiService, private router: Router) { }

  login() {
    this.api.requestLogin({
      email: this.usernameValue,
      password: this.passwordValue
    }).subscribe({
      next: (res) => {
        this.wrongUser = false;
        this.loginSuccess = true;
        localStorage.setItem('token', res.token);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500)
      },
      error: (err) => {
        this.wrongUser = true;
      }
    })
  }
}
