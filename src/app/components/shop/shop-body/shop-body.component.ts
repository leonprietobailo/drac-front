import { Component, OnInit } from '@angular/core';
import { ItemCardComponent } from '../item-card/item-card.component';
import { ItemResponseDto } from '../../../dto/response/shop/item';
import { ItemApiService } from '../../../services/ItemApiService';

@Component({
  selector: 'app-shop-body',
  imports: [ItemCardComponent],
  templateUrl: './shop-body.component.html',
  styleUrl: './shop-body.component.scss',
})
export class ShopBodyComponent implements OnInit {
  itemResponse?: ItemResponseDto;

  constructor(private itemService: ItemApiService) {}

  ngOnInit(): void {
    this.itemService.requestItems().subscribe({
      next: (response: ItemResponseDto) => {
        this.itemResponse = response;
      },
      error: (error) => {
        console.error('Failed to load items:', error);
      },
    });
  }
}
