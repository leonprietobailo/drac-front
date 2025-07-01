import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-register-step-personal',
  imports: [
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    DatePickerModule,
  ],
  templateUrl: './register-step-personal.component.html',
  styleUrl: './register-step-personal.component.scss',
})
export class RegisterStepPersonal {
  @Input() form!: FormGroup;
  name: any;
  surname: any;
  phone: any;
  value3: Date | undefined;
}
