import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { RegisterCardComponent } from '../phases/register-card/register-card.component';
import { RegisterCardComponentPh2 } from '../phases/register-card-ph2/register-card-ph2.component';
import { RegisterCardComponentPh3 } from '../phases/register-card-ph3/register-card-ph3.component';
import { RegisterCardComponentPh4 } from '../phases/register-card-ph4/register-card-ph4.component';

@Component({
  selector: 'app-register-main',
  imports: [
    HeaderComponent,
    RegisterCardComponent,
    RegisterCardComponentPh2,
    RegisterCardComponentPh3,
    RegisterCardComponentPh4,
  ],
  templateUrl: './register-main.component.html',
  styleUrl: './register-main.component.scss',
})
export class RegisterMainComponent {}
