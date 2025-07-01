import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-register-step-address',
  imports: [
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    DatePickerModule,
  ],
  templateUrl: './register-step-address.component.html',
  styleUrl: './register-step-address.component.scss',
})
export class RegisterStepAddress {
  @Input() form!: FormGroup;
  street_num: any;
  block_flat: any;
  zip_code: any;
  city: any;
  province: any;
}
