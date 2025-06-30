import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-register-card-ph4',
  imports: [
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    DatePickerModule,
    InputOtpModule,
  ],
  templateUrl: './register-card-ph4.component.html',
  styleUrl: './register-card-ph4.component.scss',
})
export class RegisterCardComponentPh4 {
  street_num: any;
  block_flat: any;
  zip_code: any;
  city: any;
  province: any;
  value3: any;
}
