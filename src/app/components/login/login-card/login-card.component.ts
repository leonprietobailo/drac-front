import { Component } from '@angular/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login-card',
  imports: [
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
  ],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.scss',
})
export class LoginCardComponent {
  username_value: any;
  password_value: any;
}
