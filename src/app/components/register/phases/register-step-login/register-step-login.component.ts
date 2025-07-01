import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register-step-login',
  imports: [
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
  ],
  templateUrl: './register-step-login.component.html',
  styleUrl: './register-step-login.component.scss',
})
export class RegisterStepLogin {
  @Input() form!: FormGroup;
  username_value1: any;
  username_value2: any;
  checked: boolean = false;
}
