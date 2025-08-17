import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorDto, ItemDto } from '../../../dto/response/item';
import { DracStringUtils } from '../../../interceptor/utils/DracStringUtils';

@Component({
  selector: 'app-item-card',
  imports: [],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent implements OnInit {

  DracStringUtils = DracStringUtils;

  @Input() item!: ItemDto;
  @Output() itemSelected = new EventEmitter<ItemDto>();

  currentImage: string = '';
  selectedImage: string = '';

  ngOnInit(): void {
    if (this.item?.colors?.length > 0) {
      this.currentImage = this.item.colors[0].images[0].url;
      this.selectedImage = this.item.colors[0].images[0].url;
      return;
    }
    // No colors -> Fallback to default images.
    this.currentImage = this.item.images[0].url;
    this.selectedImage = this.item.images[0].url;
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

  selectColor(_t7: ColorDto) {
    this.selectedImage = _t7.images[0].url;
  }

  resetPreview() {
    this.currentImage = this.selectedImage;
  }

  previewColor(_t7: ColorDto) {
    this.currentImage = _t7.images[0].url;
  }

  onItemClick() {
    this.itemSelected.emit(this.item);
  }

  // filterUniqueColors(attributes: AttributeDto[]) {
  //   return ShopUtils.filterUniqueColors(attributes);
  // }

}
