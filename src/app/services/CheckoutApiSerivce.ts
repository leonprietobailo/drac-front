import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AddressDto, AddressResponseDto, BillingInfoDto, BillingResponseDto, RecipientDto, RecipientResponseDto, RequestPaymentResponse, ShippingResponseDto } from '../dto/response/checkout';
import { RequestPaymentDto } from '../dto/request/checkout';

@Injectable({
  providedIn: 'root',
})
export class CheckoutApiService {
  constructor(private http: HttpClient) { }
  baseUrl = environment.apiBaseUrl + '/checkout';

  requestShipping(): Observable<ShippingResponseDto> {
    return this.http.get<ShippingResponseDto>(`${this.baseUrl}/shipment`);
  }

  addRecipient(recipientDto: RecipientDto): Observable<RecipientResponseDto> {
    return this.http.post<RecipientResponseDto>(`${this.baseUrl}/recipient`, recipientDto);
  }

  addAddress(addressDto: AddressDto): Observable<AddressResponseDto> {
    return this.http.post<AddressResponseDto>(`${this.baseUrl}/address`, addressDto);
  }

    addBillingInfo(billingDto: BillingInfoDto): Observable<BillingResponseDto> {
    return this.http.post<BillingResponseDto>(`${this.baseUrl}/billing`, billingDto);
  }

  requestPayment(requestPaymentDto: RequestPaymentDto): Observable<RequestPaymentResponse> {
    return this.http.post<RequestPaymentResponse>(`${this.baseUrl}/request-gateway`, requestPaymentDto);
  }

}
