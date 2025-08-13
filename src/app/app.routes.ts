import { Routes } from '@angular/router';
import { LandingComponent } from './components/dummy/landing/landing.component';
import { LoginMainComponent } from './components/login/login-main/login-main.component';
import { RegisterMainComponent } from './components/register/register-main/register-main.component';
import { ShopMainComponent } from './components/shop/shop-main/shop-main.component';
import { LoginVerificationDummyComponent } from './components/dummy/login/login-verification-dummy/login-verification-dummy.component';
import { ShopCartMainComponent } from './components/shop/shop-cart-main/shop-cart-main.component';
import { CheckoutMainComponentComponent } from './components/checkout/checkout-main-component/checkout-main-component.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginMainComponent },
  { path: 'register', component: RegisterMainComponent },
  { path: 'shop', component: ShopMainComponent },
  { path: 'verify-login', component: LoginVerificationDummyComponent },
  { path: 'cart', component: ShopCartMainComponent},
  { path: 'checkout', component: CheckoutMainComponentComponent}
];
