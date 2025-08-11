import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AddRequestDto } from '../dto/request/cart';
import { AddResponseDto } from '../dto/response/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.apiBaseUrl + '/cart';

  addItem(payload: AddRequestDto): Observable<AddResponseDto> {
    console.log(payload);
    return this.http.post<AddResponseDto>(`${this.baseUrl}/add-item`, payload);
  }
}
