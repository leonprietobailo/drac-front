import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { AddressDto, RecipientDto, ShippingResponseDto } from '../../../dto/response/checkout';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RecipientPopupComponent } from "./recipient-popup/recipient-popup.component";

@Component({
  selector: 'app-shipment',
  imports: [CommonModule, FormsModule, CarouselModule, DialogModule, FloatLabelModule, InputTextModule, ButtonModule, RecipientPopupComponent],
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.scss'
})
export class ShipmentComponent implements OnInit {


  @Input() shippingResponse!: ShippingResponseDto;

  ShippingTypes = ShippingTypes;
  selectedType: ShippingTypes = ShippingTypes.NONE;
  selectedRecipient?: RecipientDto;
  selectedAddress?: AddressDto;
  displayRecipientPopup: boolean = false;
  displayAddressPopup: boolean = false;

  responsiveOptions: any[] | undefined;

  value1: string | undefined;
  value2: string | undefined;
  value3: string | undefined;

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1800px',
        numVisible: 4,
        numScroll: 1
      },
      {
        breakpoint: '1440px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '1100px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ]
  }

  selectType(type: ShippingTypes) {
    this.selectedType = type;
  }

  selectRecipient(recipient: RecipientDto) {
    this.selectedRecipient = recipient;
  }

  selectAddress(address: AddressDto) {
    this.selectedAddress = address;
  }

  showRecipientPopup() {
    this.displayRecipientPopup = true;
  }

  showAddressPopup() {
    this.displayAddressPopup = true;
  }

  persistNewRecipient() {

  }

  updateRecipient(recipientDto: RecipientDto) {
    this.shippingResponse.recipients = [...this.shippingResponse.recipients, recipientDto];
    this.selectedRecipient = recipientDto;
  }


}


export enum ShippingTypes {
  POINT,
  ADDRESS,
  NONE
}
