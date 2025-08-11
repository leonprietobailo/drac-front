export interface AddResponseDto {
  status: AddResponseStatus;
}

export enum AddResponseStatus {
  SUCCESS = 'SUCCESS',
  MERGED = 'MERGED',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}

export interface CartResponseDto {
  status: CartResponseStatus;
  subtotal: string,
  shipment: string,
  total: string,
  items: CartItemResponseDto[];
}

export enum CartResponseStatus {
  SUCCESS = 'SUCCESS',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}

export interface CartItemResponseDto {
  id: number;
  itemId: number;
  url: string;
  title: string;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  price: string;
  colors: string[];
  sizes: string[];
}

export interface ItemDeleteResponseDto {
  status: ItemDeleteResponseStatus;
}

export enum ItemDeleteResponseStatus {
  SUCCESS = 'SUCCESS',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}