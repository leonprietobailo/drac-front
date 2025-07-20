import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ItemResponseDto } from '../dto/response/shop/item';

@Injectable({
  providedIn: 'root',
})
export class ItemApiService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.apiBaseUrl + '/items';

  requestItems() {
    return this.http.get<ItemResponseDto>(`${this.baseUrl}`);
  }
}
