import { Component, OnInit } from '@angular/core';
import { ItemCardComponent } from '../item-card/item-card.component';
import { ItemDto, ItemResponseDto } from '../../../dto/response/shop/item';
import { ItemApiService } from '../../../services/ItemApiService';
import { DialogModule } from 'primeng/dialog';
import { ShopPopupComponent } from "./shop-popup/shop-popup.component";
import { DefaultUrlSerializer } from '@angular/router';

@Component({
  selector: 'app-shop-body',
  imports: [ItemCardComponent, DialogModule, ShopPopupComponent],
  templateUrl: './shop-body.component.html',
  styleUrl: './shop-body.component.scss',
})
export class ShopBodyComponent implements OnInit {

  displayDialog: boolean = false;
  selectedItem: ItemDto | null = null; 
  itemResponse?: ItemResponseDto;

  constructor(private itemService: ItemApiService) { }

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

  onItemSelected($event: ItemDto) {
    this.selectedItem = $event;
    this.displayDialog = true;
  }

  onPopupClose() {
    this.displayDialog = false;
   this.selectedItem = null; 
}
}
