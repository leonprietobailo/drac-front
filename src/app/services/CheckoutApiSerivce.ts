import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ShippingResponseDto } from '../dto/response/checkout';

@Injectable({
  providedIn: 'root',
})
export class CheckoutApiService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.apiBaseUrl + '/users';

  requestShipping(): Observable<ShippingResponseDto> {
    return this.http.get<ShippingResponseDto>(`${this.baseUrl}/shipment`);
  }

}
