import { Component, Input, OnInit, signal } from '@angular/core';
import { model } from '@angular/core';
import { ItemDto } from '../../../../dto/response/shop/item';
import { GalleriaModule } from 'primeng/galleria';
// import { PhotoService } from '../../../../services/PhotoService';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-shop-popup',
  templateUrl: './shop-popup.component.html',
  styleUrls: ['./shop-popup.component.scss'],
  imports: [GalleriaModule, FormsModule, InputNumberModule, ButtonModule]
})
export class ShopPopupComponent {

  @Input() itemDto!: ItemDto | null;
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

  images = model<any[]>([]);

  ngOnInit(): void {
    this.images.update(images => {
      images.push(



        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
          alt: 'Description for Image 1',
          title: 'Title 1'
        },
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
          alt: 'Description for Image 2',
          title: 'Title 2'
        },
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg',
          alt: 'Description for Image 3',
          title: 'Title 3'
        },
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg',
          alt: 'Description for Image 4',
          title: 'Title 4'
        },
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5s.jpg',
          alt: 'Description for Image 5',
          title: 'Title 5'
        },
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6s.jpg',
          alt: 'Description for Image 6',
          title: 'Title 6'
        },
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
          alt: 'Description for Image 7',
          title: 'Title 7'
        },
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria8.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria8s.jpg',
          alt: 'Description for Image 8',
          title: 'Title 8'
        },
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria9.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria9s.jpg',
          alt: 'Description for Image 9',
          title: 'Title 9'
        },
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria10s.jpg',
          alt: 'Description for Image 10',
          title: 'Title 10'
        },
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria11s.jpg',
          alt: 'Description for Image 11',
          title: 'Title 11'
        },
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria12.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria12s.jpg',
          alt: 'Description for Image 12',
          title: 'Title 12'
        },
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria13.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria13s.jpg',
          alt: 'Description for Image 13',
          title: 'Title 13'
        },
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria14.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria14s.jpg',
          alt: 'Description for Image 14',
          title: 'Title 14'
        },
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria15.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria15s.jpg',
          alt: 'Description for Image 15',
          title: 'Title 15'
        }


      );
      return images;
    });
  }

}