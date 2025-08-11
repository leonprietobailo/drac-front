import { Component, input, Input, OnInit } from '@angular/core';
import { CartItemResponseDto } from '../../../dto/response/cart';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputNumber } from 'primeng/inputnumber';

@Component({
  selector: 'tr[app-shop-cart-item]',
  imports: [FormsModule, SelectModule, InputNumber],
  templateUrl: './shop-cart-item.component.html',
  styleUrl: './shop-cart-item.component.scss'
})
export class ShopCartItemComponent implements OnInit {


  @Input() inputCartItem!: CartItemResponseDto;

  selectedSize: string | undefined;
  quantity: number | undefined;

  ngOnInit(): void {
    console.log(this.inputCartItem);
    this.selectedSize = this.inputCartItem.selectedSize;
    this.quantity = this.inputCartItem.quantity;
  }

  showPopup() {
    throw new Error('Method not implemented.');
  }

  removeItem() {
    throw new Error('Method not implemented.');
  }


}
