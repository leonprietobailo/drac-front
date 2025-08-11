import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ItemDto, ItemResponseDto } from '../dto/response/item';

@Injectable({
  providedIn: 'root',
})
export class ItemApiService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.apiBaseUrl + '/items';

  requestItems() {
    return this.http.get<ItemResponseDto>(`${this.baseUrl}`);
  }

  requestItem(id: number) {
    return this.http.get<ItemDto>(`${this.baseUrl}/item?id=${id}`);
  }
}
