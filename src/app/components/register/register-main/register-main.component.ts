import { Component, EventEmitter, Output } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { RegisterStepLogin } from '../phases/register-step-login/register-step-login.component';
import { RegisterStepPersonal } from '../phases/register-step-personal/register-step-personal.component';
import { RegisterStepAddress } from '../phases/register-step-address/register-step-address.component';
import { RegisterStepTotp } from '../phases/register-step-totp/register-step-totp.component';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterApiService } from '../../../services/RegisterApiService';

@Component({
  selector: 'app-register-main',
  imports: [
    HeaderComponent,
    RegisterStepLogin,
    RegisterStepPersonal,
    RegisterStepAddress,
    RegisterStepTotp,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './register-main.component.html',
  styleUrl: './register-main.component.scss',
})
export class RegisterMainComponent {
  currentStep = 0;
  registerForm: FormGroup;

  @Output() proceed = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private api: RegisterApiService) {
    this.registerForm = this.fb.group({
      login: this.fb.group({
        username: this.fb.control('', {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur',
        }),
        password: this.fb.control('', {
          validators: [Validators.required, Validators.minLength(6)],
          updateOn: 'blur',
        }),
        acceptTerms: [false, Validators.requiredTrue],
      }),
      personal: this.fb.group(
        {
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          birthdate: ['', Validators.required],
          phone: [
            '',
            [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)],
          ],
        },
        { updateOn: 'blur' }
      ),
      address: this.fb.group(
        {
          streetNumber: [''],
          postalCode: [''],
          city: [''],
          province: [''],
          blockFlat: [''],
        },
        { updateOn: 'blur' }
      ),
      totp: this.fb.group(
        {
          totp: ['', [Validators.required, Validators.minLength(4)]],
        },
        { updateOn: 'blur' }
      ),
    });
  }

  nextStep(): void {
    this.getCurrentStepForm().markAllAsTouched();
    if (this.getCurrentStepForm().invalid) {
      return;
    }

    if (this.currentStep === 0) {
      // API Call to check email availability.
      const username = this.loginForm.get('username')?.value;
      this.api.getEmailExists(username).subscribe((isTaken) => {
        if (isTaken) {
          this.loginForm.get('username')?.setErrors({ taken: true });
          return;
        }

        if (this.currentStep < this.steps.length - 1) {
          this.currentStep++;
        }
      });
    } else {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
      }
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    console.log(JSON.stringify(this.registerForm.value, null, 2));
  }

  steps = [
    { label: 'Login Details', key: 'login' },
    { label: 'Personal Info', key: 'personal' },
    { label: 'Address Info', key: 'address' },
    { label: 'TOTP', key: 'totp' },
  ];

  getCurrentStepForm(): FormGroup {
    return this.registerForm.get(this.steps[this.currentStep].key) as FormGroup;
  }

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
