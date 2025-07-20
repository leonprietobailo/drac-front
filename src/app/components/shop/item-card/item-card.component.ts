import { Component, Input, OnInit } from '@angular/core';
import { ItemDto } from '../../../dto/response/shop/item';
import { ItemApiService } from '../../../services/ItemApiService';

@Component({
  selector: 'app-item-card',
  imports: [],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent implements OnInit {
  @Input() item!: ItemDto;

  currentImage: string = '';

  ngOnInit(): void {
    this.currentImage = this.item.colors[0].url;
    console.log(this.item);
  }

  blendWithWhite(colorHex: string): string {
    const r = parseInt(colorHex.slice(1, 3), 16);
    const g = parseInt(colorHex.slice(3, 5), 16);
    const b = parseInt(colorHex.slice(5, 7), 16);

    const blendedR = Math.round(r * 0.8 + 255 * 0.2);
    const blendedG = Math.round(g * 0.8 + 255 * 0.2);
    const blendedB = Math.round(b * 0.8 + 255 * 0.2);

    return `rgb(${blendedR}, ${blendedG}, ${blendedB})`;
  }
}
