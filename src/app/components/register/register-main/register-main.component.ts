import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { RegisterStepLogin } from '../phases/register-step-login/register-step-login.component';
import { RegisterStepPersonal } from '../phases/register-step-personal/register-step-personal.component';
import { RegisterStepAddress } from '../phases/register-step-address/register-step-address.component';
import { RegisterStepTotp } from '../phases/register-step-totp/register-step-totp.component';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-main',
  imports: [
    HeaderComponent,
    RegisterStepLogin,
    RegisterStepPersonal,
    RegisterStepAddress,
    RegisterStepTotp,
    ButtonModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './register-main.component.html',
  styleUrl: './register-main.component.scss',
})
export class RegisterMainComponent {
  currentStep = 0;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      login: this.fb.group({}),
      personal: this.fb.group({}),
      address: this.fb.group({}),
      totp: this.fb.group({}),
    });
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // handle final submission
    }
  }

  steps = [
    { label: 'Login Details', key: 'login' },
    { label: 'Personal Info', key: 'personal' },
    { label: 'Address Info', key: 'address' },
    { label: 'TOTP', key: 'totp' },
  ];

  get loginForm(): FormGroup {
    return this.registerForm.get('login') as FormGroup;
  }

  get personalForm(): FormGroup {
    return this.registerForm.get('personal') as FormGroup;
  }

  get addressForm(): FormGroup {
    return this.registerForm.get('address') as FormGroup;
  }

  get totpForm(): FormGroup {
    return this.registerForm.get('totp') as FormGroup;
  }
}
