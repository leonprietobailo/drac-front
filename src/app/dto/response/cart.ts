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
  cart: CartDto;
}

export enum CartResponseStatus {
  SUCCESS = 'SUCCESS',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',

  PENDING = 'PENDING'
}

export interface CartDto {
  subtotal: number,
  shipment: number,
  total: number,
  totalNoVat: number,
  items: CartItemResponseDto[];
}

export interface CartItemResponseDto {
  id: number;
  itemId: number;
  url: string;
  title: string;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  price: number;
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