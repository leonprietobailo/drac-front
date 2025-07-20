import { Component } from '@angular/core';
import { ItemCardComponent } from '../item-card/item-card.component';

@Component({
  selector: 'app-shop-body',
  imports: [ItemCardComponent],
  templateUrl: './shop-body.component.html',
  styleUrl: './shop-body.component.scss',
})
export class ShopBodyComponent {}
