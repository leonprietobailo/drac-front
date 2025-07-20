import { Component } from '@angular/core';
import { ShopHeaderComponent } from '../shop-header/shop-header.component';
import { ShopBodyComponent } from '../shop-body/shop-body.component';

@Component({
  selector: 'app-shop-main',
  imports: [ShopHeaderComponent, ShopBodyComponent],
  templateUrl: './shop-main.component.html',
  styleUrl: './shop-main.component.scss',
})
export class ShopMainComponent {}
