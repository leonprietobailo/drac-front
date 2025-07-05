import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputOtpModule } from 'primeng/inputotp';
import { OtpInputComponent } from '../../../general/totp/totp.component';

@Component({
  selector: 'app-register-step-totp',
  imports: [
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    DatePickerModule,
    InputOtpModule,
    ReactiveFormsModule,
    OtpInputComponent,
  ],
  templateUrl: './register-step-totp.component.html',
  styleUrl: './register-step-totp.component.scss',
})
export class RegisterStepTotp {
  @Input() form!: FormGroup;
  street_num: any;
  block_flat: any;
  zip_code: any;
  city: any;
  province: any;
  value3: any;

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    console.log(control?.invalid);
    return control?.invalid && control.touched;
  }
}
