import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Carousel, CarouselModule } from 'primeng/carousel';
import { AddressDto, BillingInfoDto, RecipientDto, ShippingResponseDto } from '../../../dto/response/checkout';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RecipientPopupComponent } from "./recipient-popup/recipient-popup.component";
import { AddressPopupComponent } from "./address-popup/address-popup.component";
import { RequestPaymentDto, ShipmentTypes } from '../../../dto/request/checkout';

@Component({
  selector: 'app-shipment',
  imports: [CommonModule, FormsModule, CarouselModule, DialogModule, FloatLabelModule, InputTextModule, ButtonModule, RecipientPopupComponent, AddressPopupComponent],
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.scss'
})
export class ShipmentComponent implements OnInit, OnChanges {

  @Input() shippingResponse!: ShippingResponseDto;
  @Input() requestPaymentDraft!: Partial<RequestPaymentDto>;
  @Output() dtoUpdate = new EventEmitter<AddressDto | RecipientDto>();
  @ViewChild('recipientCr') recipientCr!: Carousel;
  @ViewChild('addressCr') addressCr!: Carousel;

  ShipmentTypes = ShipmentTypes;
  selectedType?: ShipmentTypes;
  selectedRecipient?: RecipientDto;
  selectedAddress?: AddressDto;
  displayRecipientPopup: boolean = false;
  displayAddressPopup: boolean = false;

  responsiveOptions: any[] | undefined;
  recipientCarouselWidth: number = 0;
  addressCarouselWidth: number = 0;
  recipientPage: number = 0;
  addressPage: number = 0;
  ngOnInit(): void {
    this.recipientCarouselWidth = 300 * this.shippingResponse.recipients.length;
    this.addressCarouselWidth = 300 * this.shippingResponse.addresses.length;

    this.responsiveOptions = [
      {
        breakpoint: '1800px',
        numVisible: 4,
        numScroll: 4
      },
      {
        breakpoint: '1440px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '1100px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ]
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shippingResponse']) {
      this.recipientCarouselWidth = 300 * this.shippingResponse.recipients.length;
      this.addressCarouselWidth = 300 * this.shippingResponse.addresses.length;
      console.log(this.shippingResponse)
      console.log("updated at shipment")
    }
  }

  trackByRecipient(index: number, r: RecipientDto) {
    return r.id ?? index;
  }

  selectType(type: ShipmentTypes) {
    this.selectedType = type;
    this.requestPaymentDraft.type = type;
  }

  selectRecipient(recipient: RecipientDto) {
    this.selectedRecipient = recipient;
    this.requestPaymentDraft.recipient = recipient;
  }

  selectAddress(address: AddressDto) {
    this.selectedAddress = address;
    this.requestPaymentDraft.address = address;
  }

  showRecipientPopup() {
    this.displayRecipientPopup = true;
  }

  showAddressPopup() {
    this.displayAddressPopup = true;
  }

  updateRecipient(recipientDto: RecipientDto) {
    this.dtoUpdate.emit(recipientDto);
    this.recipientCarouselWidth = 300 * this.shippingResponse.recipients.length;
    this.selectedRecipient = recipientDto;

    setTimeout(() => {
      const visible = this.recipientCr?.numVisible || 1;
      this.recipientPage = Math.max(0, Math.ceil(this.shippingResponse.recipients.length / visible) - 1);
    });

  }

  updateAddress(addressDto: AddressDto) {
    this.dtoUpdate.emit(addressDto);
    this.addressCarouselWidth = 300 * this.shippingResponse.addresses.length;
    this.selectedAddress = addressDto;

    setTimeout(() => {
      const visible = this.addressCr?.numVisible || 1;
      this.addressPage = Math.max(0, Math.ceil(this.shippingResponse.addresses.length / visible) - 1);
    });
  }
}

export enum ShippingTypes {
  POINT,
  ADDRESS,
  NONE
}
