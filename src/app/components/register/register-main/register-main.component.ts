import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { RegisterCardComponent } from '../phases/register-card/register-card.component';
import { RegisterCardComponentPh2 } from '../phases/register-card-ph2/register-card-ph2.component';
import { RegisterCardComponentPh3 } from '../phases/register-card-ph3/register-card-ph3.component';

@Component({
  selector: 'app-register-main',
  imports: [HeaderComponent, RegisterCardComponent],
    HeaderComponent,
    RegisterCardComponent,
    RegisterCardComponentPh2,
    RegisterCardComponentPh3,
  ],
  templateUrl: './register-main.component.html',
  styleUrl: './register-main.component.scss',
})
export class RegisterMainComponent {}
