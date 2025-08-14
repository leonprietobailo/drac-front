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
import { ShipmentComponent } from "../shipment/shipment.component";
import { BillingComponent } from "../billing/billing.component";

@Component({
  selector: 'app-checkout-main-component',
  imports: [ShopHeaderComponent, StepperModule, ButtonModule, FormsModule, SelectButtonModule, CarouselModule, CommonModule, DialogModule, FloatLabelModule, InputTextModule, ShipmentComponent, BillingComponent],
  templateUrl: './checkout-main-component.component.html',
  styleUrl: './checkout-main-component.component.scss'
})
export class CheckoutMainComponentComponent implements OnInit {
  // PH1

  shippingResponse: ShippingResponseDto = {
    status: ShippingResponseStatus.PENDING,
    addresses: [],
    billingInfos: [],
    recipients: []
  }

  constructor(private api: CheckoutApiService) { }

  ngOnInit(): void {
    this.api.requestShipping().subscribe({
      next: (response) => {
        this.shippingResponse = response;
      }
    });
  }

  propagateAddressUpdate(addressDto: AddressDto) {
    this.shippingResponse = { ...this.shippingResponse, addresses: [...this.shippingResponse.addresses, addressDto] };
  }
}

