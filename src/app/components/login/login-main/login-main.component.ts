import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { LoginCardComponent } from '../login-card/login-card.component';

@Component({
  selector: 'app-login-main',
  imports: [HeaderComponent, LoginCardComponent],
  templateUrl: './login-main.component.html',
  styleUrl: './login-main.component.scss',
})
export class LoginMainComponent {}
