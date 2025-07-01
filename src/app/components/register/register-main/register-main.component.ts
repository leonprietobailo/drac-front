import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { RegisterStepLogin } from '../phases/register-step-login/register-step-login.component';
import { RegisterStepPersonal } from '../phases/register-step-personal/register-step-personal.component';
import { RegisterStepAddress } from '../phases/register-step-address/register-step-address.component';
import { RegisterStepTotp } from '../phases/register-step-totp/register-step-totp.component';

@Component({
  selector: 'app-register-main',
  imports: [
    HeaderComponent,
    RegisterStepLogin,
    RegisterStepPersonal,
    RegisterStepAddress,
    RegisterStepTotp,
  ],
  templateUrl: './register-main.component.html',
  styleUrl: './register-main.component.scss',
})
export class RegisterMainComponent {}
