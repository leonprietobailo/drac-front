import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AddRequestDto } from '../dto/request/cart';
import { AddResponseDto, CartResponseDto } from '../dto/response/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  constructor(private http: HttpClient) { }

  private baseUrl = environment.apiBaseUrl + '/cart';

  addItem(payload: AddRequestDto): Observable<AddResponseDto> {
    return this.http.post<AddResponseDto>(`${this.baseUrl}/add-item`, payload);
  }

  getCart(): Observable<CartResponseDto> {
    return this.http.get<CartResponseDto>(`${this.baseUrl}`);
  }
}
