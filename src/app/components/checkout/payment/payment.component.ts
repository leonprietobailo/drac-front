import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CartResponseDto } from '../../../dto/response/cart';
import { CartApiService } from '../../../services/CartApiService';
import { DracStringUtils } from '../../../interceptor/utils/DracStringUtils';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckoutApiService } from '../../../services/CheckoutApiSerivce';
import { RequestPaymentDto } from '../../../dto/request/checkout';
import { Router } from '@angular/router';
import RevolutCheckout, { RevolutCheckoutInstance } from '@revolut/checkout';
import { firstValueFrom } from 'rxjs';
import { PaymentRequestInstance } from '@revolut/checkout/types/types';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-payment',
  imports: [FormsModule, ButtonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  providers: [MessageService]
})
export class PaymentComponent implements OnInit {

  DracStringUtils = DracStringUtils;

  @Input() cartDto!: CartResponseDto;
  @Input() paymentDto!: RequestPaymentDto;
  @Input() requestPaymentDraft!: Partial<RequestPaymentDto>;

  @Output() paymentCompleted = new EventEmitter<void>();

  @ViewChild('paymentRequest', { static: true }) paymentRequestRef!: ElementRef<HTMLDivElement>;

  revolutInstance?: RevolutCheckoutInstance;
  paymentRequest?: PaymentRequestInstance;

  loading: boolean = false;
  error?: string;
  token?: string;
  env: 'prod' | 'sandbox' = 'sandbox';


  constructor(private api: CheckoutApiService, private router: Router, private messageService: MessageService) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.error = undefined;

    try {
      const requestPaymentDto = this.requestPaymentDraft as RequestPaymentDto;

      const resp = await firstValueFrom(this.api.requestPayment(requestPaymentDto));
      this.token = resp.token;

      this.revolutInstance = await RevolutCheckout(this.token, this.env);

      this.paymentRequest = this.revolutInstance.paymentRequest({
        target: this.paymentRequestRef.nativeElement,
        buttonStyle: {
          height: "42px",
          radius: 'small'
        },
        onSuccess: () => {
          this.paymentCompleted.emit();
        },
        onError: (error: unknown) => {
          this.messageService.add({
            severity: 'error', summary: 'Error', detail: "Error processant el teu pagament.", life: 3000
          })
          console.log(` went wrong. ${String(error)}`);
        }
      });

      console.log(this.paymentRequest.canMakePayment())

      this.paymentRequest.canMakePayment().then(() => {
        this.paymentRequest?.render();
      })

    } catch (e: any) {
      console.error(e);
      this.error = e?.message ?? 'Failed to initialize payment.';
    } finally {
      this.loading = false;
    }
  }

  requestPayment() {
    this.revolutInstance!.payWithPopup({
      onSuccess: () => {
        this.paymentCompleted.emit();
        console.log("completed")
      },
      onError: (error: unknown) => {
        this.messageService.add({
          severity: 'error', summary: 'Error', detail: "Error processant el teu pagament.", life: 3000
        })
        console.log(` went wrong. ${String(error)}`);
      }
    })
  }
}
