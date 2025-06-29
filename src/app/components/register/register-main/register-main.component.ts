import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { RegisterCardComponent } from '../register-card/register-card.component';

@Component({
  selector: 'app-register-main',
  imports: [HeaderComponent, RegisterCardComponent],
  templateUrl: './register-main.component.html',
  styleUrl: './register-main.component.scss',
})
export class RegisterMainComponent {}
