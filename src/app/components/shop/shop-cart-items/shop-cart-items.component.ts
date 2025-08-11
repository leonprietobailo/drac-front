import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, UntypedFormArray } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ShopCartItemComponent } from "../shop-cart-item/shop-cart-item.component";
import { CartApiService } from '../../../services/CartApiService';
import { CartItemResponseDto, CartResponseDto } from '../../../dto/response/cart';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ShopPopupEditComponent } from "../shop-body/shop-popup-edit/shop-popup-edit.component";
import { ItemDto } from '../../../dto/response/item';

@Component({
  selector: 'app-shop-cart-items',
  imports: [FormsModule, SelectModule, InputNumberModule, ShopCartItemComponent, ButtonModule, DialogModule, ShopPopupEditComponent],
  templateUrl: './shop-cart-items.component.html',
  styleUrl: './shop-cart-items.component.scss'
})
export class ShopCartItemsComponent implements OnInit {

  cart: CartResponseDto | undefined;
  editItem: ItemDto | undefined;
  popupVisible: boolean = false;

  constructor(private api: CartApiService) { }

  ngOnInit(): void {
    this.api.getCart().subscribe({
      next: (response) => {
        this.cart = response;
      }
    })
  }

  onPopupClose() {
    this.popupVisible = false;
    this.editItem = undefined;
  }
}
