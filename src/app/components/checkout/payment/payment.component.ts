import { Component, Input, OnInit } from '@angular/core';
import { CartResponseDto } from '../../../dto/response/cart';
import { CartApiService } from '../../../services/CartApiService';
import { DracStringUtils } from '../../../interceptor/utils/DracStringUtils';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckoutApiService } from '../../../services/CheckoutApiSerivce';
import { RequestPaymentDto } from '../../../dto/request/checkout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  imports: [FormsModule, ButtonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  DracStringUtils = DracStringUtils;

  @Input() cartDto!: CartResponseDto;
  @Input() paymentDto!: RequestPaymentDto;
  @Input() requestPaymentDraft!: Partial<RequestPaymentDto>;

  constructor(private api: CheckoutApiService, private router: Router) { }

  requestPayment() {
    const requestPaymentDto = this.requestPaymentDraft as RequestPaymentDto;
    this.api.requestPayment(requestPaymentDto).subscribe({
      next: (resp) => {
         window.location.href = resp.url;
      }
    })
  }

}
