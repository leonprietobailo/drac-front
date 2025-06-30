import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-register-card-ph3',
  imports: [
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    DatePickerModule,
  ],
  templateUrl: './register-card-ph3.component.html',
  styleUrl: './register-card-ph3.component.scss',
})
export class RegisterCardComponentPh3 {
  street_num: any;
  block_flat: any;
  zip_code: any;
  city: any;
  province: any;
}
