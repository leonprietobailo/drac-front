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
import { AddResponseStatus, CartItemResponseDto, ItemDeleteResponseStatus } from '../../../../dto/response/cart';
import { DracStringUtils } from '../../../../interceptor/utils/DracStringUtils';

@Component({
  selector: 'app-shop-popup-edit',
  templateUrl: './shop-popup-edit.component.html',
  styleUrls: ['./shop-popup-edit.component.scss'],
  imports: [GalleriaModule, FormsModule, InputNumberModule, ButtonModule, SkeletonModule, ToastModule],
  providers: [MessageService]
})
export class ShopPopupEditComponent {

  DracStringUtils = DracStringUtils;

  @Input() itemDto!: ItemDto;
  @Input() cartItemDto!: CartItemResponseDto;
  @Output() closePopup = new EventEmitter<void>();

  quantity: number = 1;
  selectedColor: ColorDto | undefined;
  selectedSize: SizeDto | undefined;
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
    this.selectedColor = this.itemDto.colors.find(color => color.color === this.cartItemDto.selectedColor);
    this.selectedSize = this.itemDto.sizes.find(size => size.size === this.cartItemDto.selectedSize);
    this.quantity = this.cartItemDto.quantity;
    console.log(this.itemDto)
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

  save() {
    this.api.deleteItem({
      productId: this.cartItemDto.id
    }).subscribe({
      next: (response) => {
        if (response.status == ItemDeleteResponseStatus.SUCCESS) {
          this.api.addItem({
            productId: this.itemDto.id,
            sizeId: this.selectedSize?.id,
            colorId: this.selectedColor?.id,
            quantity: this.quantity
          }).subscribe({
            next: () => {
              this.closeIconClick();
            }
          })
        }
      }
    })
  }
}
