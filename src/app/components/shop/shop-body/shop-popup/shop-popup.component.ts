import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { model } from '@angular/core';
import { ColorDto, ImageDto, ItemDto, SizeDto } from '../../../../dto/response/shop/item';
import { GalleriaModule } from 'primeng/galleria';
// import { PhotoService } from '../../../../services/PhotoService';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ShopUtils } from '../../../../utils/ShopUtils';

@Component({
  selector: 'app-shop-popup',
  templateUrl: './shop-popup.component.html',
  styleUrls: ['./shop-popup.component.scss'],
  imports: [GalleriaModule, FormsModule, InputNumberModule, ButtonModule]
})
export class ShopPopupComponent {

  @Input() itemDto!: ItemDto;
    @Output() closePopup = new EventEmitter<void>();

  value1: any = 1;
  selectedColor: ColorDto | null = null;
  activeGalleriaIndex: number = 0;

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
    this.selectedColor = color;
    this.activeGalleriaIndex = 0;
  }

  closeIconClick () {
this.closePopup.emit();
  }

}
