import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, UntypedFormArray } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ShopCartItemComponent } from "../shop-cart-item/shop-cart-item.component";
import { CartApiService } from '../../../services/CartApiService';
import { CartItemResponseDto, CartResponseDto, ItemDeleteResponseStatus } from '../../../dto/response/cart';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ShopPopupEditComponent } from "../shop-body/shop-popup-edit/shop-popup-edit.component";
import { ItemDto } from '../../../dto/response/item';
import { ItemApiService } from '../../../services/ItemApiService';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop-cart-items',
  imports: [FormsModule, SelectModule, InputNumberModule, ShopCartItemComponent, ButtonModule, DialogModule, ShopPopupEditComponent, Toast, RouterLink],
  templateUrl: './shop-cart-items.component.html',
  styleUrl: './shop-cart-items.component.scss',
  providers: [MessageService]
})
export class ShopCartItemsComponent implements OnInit {

  cartResponse: CartResponseDto | undefined;
  editItem: ItemDto | undefined;
  editCartItem: CartItemResponseDto | undefined;
  popupVisible: boolean = false;

  constructor(private cartApi: CartApiService, private itemApi: ItemApiService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.fetchCart();
  }

  onPopupClose() {
    this.fetchCart();
    this.popupVisible = false;
    this.editItem = undefined;
  }

  onDelete(cartItem: CartItemResponseDto) {
    this.cartApi.deleteItem({
      productId: cartItem.id
    }).subscribe({
      next: (response) => {
        this.fetchCart();
        if (response.status == ItemDeleteResponseStatus.SUCCESS) {
          this.messageService.add({ severity: 'success', summary: 'Informació', detail: 'Producte esborrat del carro.' });
        }
      }
    });
  }

  onEdit(cartItem: CartItemResponseDto) {
    this.itemApi.requestItem(cartItem.itemId).subscribe({
      next: (response) => {
        this.editItem = response;
        this.editCartItem = cartItem;
        this.popupVisible = true;
      }
    });
  }

  fetchCart() {
    this.cartApi.getCart().subscribe({
      next: (response) => {
        this.cartResponse = response;
        console.log(this.cartResponse)
        console.log(this.cartResponse?.cart?.items?.length)
      }
    })
  }
}