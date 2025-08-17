import { Component, Input, OnInit } from '@angular/core';
import { CartResponseDto } from '../../../dto/response/cart';
import { CartApiService } from '../../../services/CartApiService';
import { DracStringUtils } from '../../../interceptor/utils/DracStringUtils';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  DracStringUtils = DracStringUtils;

  @Input() cartDto!: CartResponseDto;

  constructor(private api: CartApiService) { }


}
