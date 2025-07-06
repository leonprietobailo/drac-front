import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-step-address',
  imports: [
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    DatePickerModule,
    ReactiveFormsModule,
    CommonModule,
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

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control.touched;
  }
}
