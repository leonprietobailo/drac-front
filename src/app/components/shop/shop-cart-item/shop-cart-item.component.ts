import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { CartItemResponseDto } from '../../../dto/response/cart';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'tr[app-shop-cart-item]',
  imports: [FormsModule, SelectModule],
  templateUrl: './shop-cart-item.component.html',
  styleUrl: './shop-cart-item.component.scss'
})
export class ShopCartItemComponent implements OnInit {
  @Input() inputCartItem!: CartItemResponseDto;

  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  selectedSize: string | undefined;
  quantity: number | undefined;

  ngOnInit(): void {
    this.selectedSize = this.inputCartItem.selectedSize;
    this.quantity = this.inputCartItem.quantity;
  }

  onEditStart() {
    this.onEdit.emit();
  }

  onDeleteStart() {
    this.onDelete.emit();
  }


}
