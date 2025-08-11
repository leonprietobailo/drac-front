import { Component } from '@angular/core';
import { ShopHeaderComponent } from "../shop-header/shop-header.component";
import { ShopCartItemsComponent } from "../shop-cart-items/shop-cart-items.component";

@Component({
  selector: 'app-shop-cart-main',
  imports: [ShopHeaderComponent, ShopCartItemsComponent],
  templateUrl: './shop-cart-main.component.html',
  styleUrl: './shop-cart-main.component.scss'
})
export class ShopCartMainComponent {

}
