import { Component, OnInit } from '@angular/core';
import { ShopHeaderComponent } from "../../shop/shop-header/shop-header.component";
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CarouselModule } from 'primeng/carousel';
import { CheckoutApiService } from '../../../services/CheckoutApiSerivce';
import { AddressDto, RecipientDto, ShippingResponseDto, ShippingResponseStatus } from '../../../dto/response/checkout';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-checkout-main-component',
  imports: [ShopHeaderComponent, StepperModule, ButtonModule, FormsModule, SelectButtonModule, CarouselModule, CommonModule, DialogModule, FloatLabel, FloatLabelModule, InputTextModule],
  templateUrl: './checkout-main-component.component.html',
  styleUrl: './checkout-main-component.component.scss'
})
export class CheckoutMainComponentComponent implements OnInit {
  // PH1
  ShippingTypes = ShippingTypes; // Make it available for html template.
  selectedType: ShippingTypes = ShippingTypes.NONE;
  selectedRecipient?: RecipientDto;
  selectedAddress?: AddressDto;
  displayRecipientPopup: boolean = true;
  displayAddressPopup: boolean = false;
      value1: string | undefined;
            value2: string | undefined;

                  value3: string | undefined;


  shippingResponse: ShippingResponseDto = {
    status: ShippingResponseStatus.PENDING,
    addresses: [],
    billingInfos: [],
    recipients: []
  }

  responsiveOptions: any[] | undefined;


  constructor(private api: CheckoutApiService) { }

  ngOnInit(): void {
    this.api.requestShipping().subscribe({
      next: (response) => {
        this.shippingResponse = response;
      }
    })

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
}

export enum ShippingTypes {
  POINT,
  ADDRESS,
  NONE
}
