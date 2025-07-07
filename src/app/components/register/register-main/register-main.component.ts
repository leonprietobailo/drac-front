import { requiredGroupIfAnyFilled } from './../phases/register-step-address/validators/group-or-none-mandatory';
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
import { TotpRequestDto, UserRequestDto } from '../../../dto/request/register';
import {
  TotpResponseStatus,
  UserResponseStatus,
} from '../../../dto/response/register';
import { RegisterStepSuccessComponent } from '../phases/register-step-success/register-step-success.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
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
    RegisterStepSuccessComponent,
    ProgressSpinnerModule,
  ],
  templateUrl: './register-main.component.html',
  styleUrl: './register-main.component.scss',
})
export class RegisterMainComponent {
  currentStep = 0;
  registerForm: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private api: RegisterApiService) {
    this.registerForm = this.fb.group({
      login: this.fb.group({
        email: this.fb.control('', {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur',
        }),
        password: this.fb.control('', {
          validators: [Validators.required, Validators.minLength(6)],
          updateOn: 'blur',
        }),
        acceptTerms: [false, Validators.requiredTrue],
        newsletter: [false],
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
          postalCode: ['', [Validators.minLength(5), Validators.maxLength(5)]],
          city: [''],
          province: [''],
          blockFlat: [''],
        },
        { validators: requiredGroupIfAnyFilled, updateOn: 'blur' }
      ),
      totp: this.fb.group(
        {
          totp: ['', [Validators.required, Validators.minLength(4)]],
        },
        { updateOn: 'blur' }
      ),
    });
  }

  attemptNextStep(): void {
    this.loading = true;
    this.getCurrentStepForm().markAllAsTouched();
    if (this.getCurrentStepForm().invalid) {
      this.loading = false;
      return;
    }

    if (this.currentStep === 0) {
      // API Call to check email availability.

      // const email = this.loginForm.get('email')?.value;
      // this.api.requestEmailExists(email).subscribe((isTaken) => {
      //   if (isTaken) {
      //     this.loginForm.get('email')?.setErrors({ taken: true });
      //     this.loading = false;
      //     return;
      //   }
      //   // Proceed to the next step if email is available.
      //   this.nextStep();
      // });

      setTimeout(() => {
        this.loading = false;
        // do something
      }, 3000);
    } else if (this.currentStep === 2) {
      const email = this.loginForm.get('email')?.value;

      const payload: TotpRequestDto = {
        email: email,
      };

      this.api.requestTotp(payload).subscribe({
        next: (response) => {
          if (response.status === TotpResponseStatus.SUCCESS) {
            this.nextStep();
          } else if (response.status === TotpResponseStatus.TOO_MANY_TOTPS) {
            this.totpForm.get('totp')?.setErrors({ tooManyTotps: true });
          } else {
            console.error('Unexpected TOTP response status:', response.status);
          }
        },
        error: (error) => {
          console.error('Error requesting TOTP:', error);
        },
      });
    } else if (this.currentStep === 3) {
      const payload: UserRequestDto = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
        newsletter: this.loginForm.get('newsletter')?.value,
        firstName: this.personalForm.get('firstName')?.value,
        lastName: this.personalForm.get('lastName')?.value,
        birthdate: this.personalForm.get('birthdate')?.value,
        phone: this.personalForm.get('phone')?.value,
        totp: this.totpForm.get('totp')?.value,
        address: {
          city: this.addressForm.get('city')?.value,
          province: this.addressForm.get('province')?.value,
          streetNumber: this.addressForm.get('streetNumber')?.value,
          blockFlat: this.addressForm.get('blockFlat')?.value,
          postalCode: this.addressForm.get('postalCode')?.value,
        },
      };

      this.api.requestRegister(payload).subscribe({
        next: (response) => {
          if (response.status === UserResponseStatus.SUCCESS) {
            // Registration successful, proceed to next step or show success message.
            this.nextStep();
          } else if (response.status === UserResponseStatus.WRONG_TOTP) {
            this.totpForm.get('totp')?.setErrors({ wrongTotp: true });
          } else if (response.status === UserResponseStatus.VALIDATION_FAILED) {
            this.totpForm.get('totp')?.setErrors({ wrongValidations: true });
          } else if (response.status === UserResponseStatus.TOTP_EXPIRED) {
            this.totpForm.get('totp')?.setErrors({ totpExpired: true });
          } else {
            console.error('Unexpected registration response:', response);
          }
        },
        error: (error) => {
          console.error('Error during registration:', error);
        },
      });
    } else {
      // Nothing to attempt.
      this.nextStep();
    }
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  steps = [
    { label: 'Login Details', key: 'login' },
    { label: 'Personal Info', key: 'personal' },
    { label: 'Address Info', key: 'address' },
    { label: 'TOTP', key: 'totp' },
    { label: 'Success', key: 'success' },
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
