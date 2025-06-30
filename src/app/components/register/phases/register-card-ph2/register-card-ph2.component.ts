import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-register-card-ph2',
  imports: [
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    DatePickerModule,
  ],
  templateUrl: './register-card-ph2.component.html',
  styleUrl: './register-card-ph2.component.scss',
})
export class RegisterCardComponentPh2 {
  name: any;
  surname: any;
  phone: any;
  value3: Date | undefined;
}
