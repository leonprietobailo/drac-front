import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterStepPersonal } from '../phases/register-step-personal/register-step-personal.component';
import { RegisterStepAddress } from '../phases/register-step-address/register-step-address.component';
import { RegisterStepLogin } from '../phases/register-step-login/register-step-login.component';
import { RegisterStepTotp } from '../phases/register-step-totp/register-step-totp.component';

@Component({
  selector: 'app-multi-step-register',
  imports: [
    CommonModule,
    RegisterStepPersonal,
    RegisterStepAddress,
    RegisterStepLogin,
    RegisterStepTotp,
  ],
  templateUrl: './multi-step-register.component.html',
  styleUrl: './multi-step-register.component.scss',
})
export class MultiStepRegisterComponent {
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
