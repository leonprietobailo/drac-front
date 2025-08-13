import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AddressDto, AddressResponseDto, RecipientDto, RecipientResponseDto, ShippingResponseDto } from '../dto/response/checkout';

@Injectable({
  providedIn: 'root',
})
export class CheckoutApiService {
  constructor(private http: HttpClient) { }
  baseUrl = environment.apiBaseUrl + '/users';

  requestShipping(): Observable<ShippingResponseDto> {
    return this.http.get<ShippingResponseDto>(`${this.baseUrl}/shipment`);
  }

  addRecipient(recipientDto: RecipientDto): Observable<RecipientResponseDto> {
    return this.http.post<RecipientResponseDto>(`${this.baseUrl}/recipient`, recipientDto);
  }

  addAddress(addressDto: AddressDto): Observable<AddressResponseDto> {
    return this.http.post<AddressResponseDto>(`${this.baseUrl}/address`, addressDto);
  }

}
