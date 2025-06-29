import { Routes } from '@angular/router';
import { LandingComponent } from './components/dummy/landing/landing.component';
import { LoginMainComponent } from './components/login/login-main/login-main.component';
import { RegisterMainComponent } from './components/register/register-main/register-main.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginMainComponent },
  { path: 'register', component: RegisterMainComponent },
];
