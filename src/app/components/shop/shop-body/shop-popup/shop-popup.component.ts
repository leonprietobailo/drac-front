import { Component, Input, OnInit, signal } from '@angular/core';
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
  value1: any = 1;


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

  images = model<ImageDto[]>([]);

  ngOnInit(): void {
    this.images.update(images => {
      images.push(
        ...this.provideImages()
      );
      return images;
    });
  }

  provideImages(): ImageDto[] {
    if (this.itemDto?.colors?.length > 0) {
      return this.itemDto.colors[0].images;
    }
    return this.itemDto.images;
  }

  isMultiColor(): boolean {
    return this.itemDto?.colors?.length > 0;
  }

  isMultiSize(): boolean {
        return this.itemDto?.sizes?.length > 0;
  }
}
