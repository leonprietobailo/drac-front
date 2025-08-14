import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Carousel, CarouselModule } from 'primeng/carousel';
import { AddressDto, BillingInfoDto, ShippingResponseDto } from '../../../dto/response/checkout';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BillingPopupComponent } from "./billing-popup/billing-popup.component";
import { AddressPopupComponent } from "../shipment/address-popup/address-popup.component";
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-billing',
  imports: [CommonModule, FormsModule, CarouselModule, DialogModule, FloatLabelModule, InputTextModule, ButtonModule, BillingPopupComponent, AddressPopupComponent, CheckboxModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent implements OnInit, OnChanges {

  @Input() shippingResponse!: ShippingResponseDto;
  @Output() addressUpdate = new EventEmitter<AddressDto>();
  @ViewChild('billingCr') billingCr!: Carousel;
  @ViewChild('addressCr') addressCr!: Carousel;

  BillingOptions = BillingOptions;
  selectedType: BillingOptions = BillingOptions.NONE;
  selectedBilling?: BillingInfoDto;
  selectedAddress?: AddressDto;
  displayBillingPopup: boolean = false;
  displayAddressPopup: boolean = false;

  responsiveOptions: any[] | undefined;
  value1: string | undefined;
  value2: string | undefined;
  value3: string | undefined;
  billingCarouselWidth: number = 0;
  addressCarouselWidth: number = 0;
  billingPage: number = 0;
  addressPage: number = 0;

  sameAddress: boolean = true;

  ngOnInit(): void {
    this.billingCarouselWidth = 300 * this.shippingResponse.billingInfos.length;
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
      this.billingCarouselWidth = 300 * this.shippingResponse.billingInfos.length;
      this.addressCarouselWidth = 300 * this.shippingResponse.addresses.length;
            console.log("updated at billing")
    }
  }

  selectType(type: BillingOptions) {
    this.selectedType = type;
  }

  selectBilling(billing: BillingInfoDto) {
    this.selectedBilling = billing;
  }

  selectAddress(address: AddressDto) {
    this.selectedAddress = address;
  }

  showBillingPopup() {
    this.displayBillingPopup = true;
  }

  showAddressPopup() {
    this.displayAddressPopup = true;
  }

  updateBilling(billingDto: BillingInfoDto) {
        this.shippingResponse = {
      ...this.shippingResponse,
      billingInfos:[...this.shippingResponse.billingInfos, billingDto]
    };
    this.billingCarouselWidth = 300 * this.shippingResponse.billingInfos.length;
    this.selectedBilling = billingDto;

    setTimeout(() => {
      const visible = this.billingCr?.numVisible || 1;
      this.billingPage = Math.max(0, Math.ceil(this.shippingResponse.billingInfos.length / visible) - 1);
    });
  }

  updateAddress(addressDto: AddressDto) {
    this.shippingResponse = {
      ...this.shippingResponse,
      addresses: [...this.shippingResponse.addresses, addressDto]
    };
    this.addressUpdate.emit(addressDto);
    this.addressCarouselWidth = 300 * this.shippingResponse.addresses.length;
    this.selectedAddress = addressDto;

    setTimeout(() => {
      const visible = this.addressCr?.numVisible || 1;
      this.addressPage = Math.max(0, Math.ceil(this.shippingResponse.addresses.length / visible) - 1);
    });
  }
}

export enum BillingOptions {
  YES,
  NO,
  NONE
}
