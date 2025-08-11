import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { model } from '@angular/core';
import { ColorDto, ImageDto, ItemDto, SizeDto } from '../../../../dto/response/item';
import { GalleriaModule } from 'primeng/galleria';
// import { PhotoService } from '../../../../services/PhotoService';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { CartApiService } from '../../../../services/CartApiService';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AddResponseStatus } from '../../../../dto/response/cart';

@Component({
  selector: 'app-shop-popup-edit',
  templateUrl: './shop-popup-edit.component.html',
  styleUrls: ['./shop-popup-edit.component.scss'],
  imports: [GalleriaModule, FormsModule, InputNumberModule, ButtonModule, SkeletonModule, ToastModule],
  providers: [MessageService]
})
export class ShopPopupEditComponent {

  @Input() itemDto!: ItemDto;
  @Output() closePopup = new EventEmitter<void>();

  quantity: any = 1;
  selectedColor: ColorDto | null = null;
  selectedSize: SizeDto | null = null;
  activeGalleriaIndex: number = 0;
  isImageLoading: boolean = true;

  addToCartLoading: boolean = false;

  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ];

  constructor(private api: CartApiService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.selectedColor = this.itemDto.colors?.[0];
  }

  provideImages(): ImageDto[] {
    if (this.selectedColor != null) {
      const match = this.itemDto.colors.find(color => color === this.selectedColor);
      if (match) {
        console.log(match.images)
        return match.images;
      }
    }
    return this.itemDto.images;
  }

  isMultiColor(): boolean {
    return this.itemDto?.colors?.length > 0;
  }

  isMultiSize(): boolean {
    return this.itemDto?.sizes?.length > 0;
  }

  selectColor(color: ColorDto) {
    this.isImageLoading = true;
    this.selectedColor = color;
    this.activeGalleriaIndex = 0;
  }

  selectSize(size: SizeDto) {
    this.selectedSize = size;
  }

  closeIconClick() {
    this.closePopup.emit();
  }

  addToCart() {
    this.addToCartLoading = true;
    this.api.addItem({
      productId: this.itemDto.id,
      sizeId: this.selectedSize?.id,
      colorId: this.selectedColor?.id,
      quantity: this.quantity
    }).subscribe(
      {
        next: (response) => {
          switch (response.status) {
            case AddResponseStatus.SUCCESS: {
              this.messageService.add({ severity: 'info', summary: 'Informació', detail: 'Producte afegit correctament.' });
              break;
            }
            case AddResponseStatus.MERGED: {
              this.messageService.add({ severity: 'info', summary: 'Informació', detail: 'Producte afegit fusionat amb existències prèvies.' });
              break;
            }
            case AddResponseStatus.UNEXPECTED_ERROR: {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error inesperat! Prova mes tard o contacta amb els administradors de la pàgina.' });

              break;
            }
          }
          this.addToCartLoading = false;
        },

        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error inesperat! Prova mes tard o contacta amb els administradors de la pàgina.' });
          this.addToCartLoading = false;
        }


      }
    )
  }
}
