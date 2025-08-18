import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import RevolutCheckout, { RevolutCheckoutCardField } from '@revolut/checkout';
import { RequestPaymentDto } from '../../../dto/request/checkout';
import { CheckoutApiService } from '../../../services/CheckoutApiSerivce';
import { PaymentRequestInstance } from '@revolut/checkout/types/types';

@Component({
  selector: 'app-gateway',
  standalone: true,
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent implements AfterViewInit {
  @Input() requestPaymentDto!: RequestPaymentDto;

  @ViewChild('cardField', { static: true }) cardFieldRef!: ElementRef<HTMLDivElement>;
  @ViewChild('payButton', { static: true }) payButtonRef!: ElementRef<HTMLDivElement>;
  @ViewChild('paymentRequest', { static: true }) paymentRequestRef!: ElementRef<HTMLDivElement>;

  // swap 'prod' for 'sandbox' in testing
  private env: 'prod' | 'sandbox' = 'sandbox';

  // NOTE: this should be your *order* token from the backend
  private token = 'cc4a8d8e-a5f5-4df0-9f30-0fc604025c5d';

  // Use the SDK’s type. Its submit() returns void.
  private cardField?: RevolutCheckoutCardField;
  private paymentRequest?: PaymentRequestInstance;

  constructor(private api: CheckoutApiService) { }

  async ngAfterViewInit(): Promise<void> {
    await this.init();
  }

  private async init() {
    // Pass the environment (defaults to 'prod' but keep it explicit)
    const instance = await RevolutCheckout(this.token, this.env);
    instance.setDefaultLocale('es')

    // Use the instance method to create the field
     this.cardField = instance.createCardField({
       target: this.cardFieldRef.nativeElement,
       onSuccess() {
         window.alert('Thank you!');
       },
       onError(error: unknown) {
         window.alert(`Something went wrong. ${String(error)}`);
       }
     });


    this.paymentRequest = instance.paymentRequest({
      target: this.paymentRequestRef.nativeElement,
      onSuccess() {
        window.alert('Thank you!');
      },
      onError(error: unknown) {
        window.alert(`Something went wrong. ${String(error)}`);
      }
    });

    console.log(this.paymentRequest.canMakePayment())

    this.paymentRequest.canMakePayment().then(() => {
      this.paymentRequest?.render();
    })

  }

  submitCard() {
    if (!this.cardField) {
      window.alert('Payment field not ready yet');
      return;
    }
    // Do not await; submit() is void per the SDK typings.
    this.cardField.submit({ email: 'example.customer@example.com' });
  }

  async payPopup() {
    const instance = await RevolutCheckout(this.token, this.env);
    instance.setDefaultLocale('es')
    instance.payWithPopup({
      email: "example.customer@example.com",
      onSuccess() {
        // Do something to handle successful payments
        window.alert("Thank you!")
      },
      onError(error) {
        // Do something to handle successful payments
        window.alert(`Something went wrong. ${error}`)
      }
    })
  }

  async payPopup2() {
    const instance = await RevolutCheckout(this.token, this.env);

    instance.paymentRequest({
      target: this.paymentRequestRef.nativeElement,
      onSuccess() {
        window.alert('Thank you!');
      },
      onError(error: unknown) {
        window.alert(`Something went wrong. ${String(error)}`);
      }
    });
  }
}
