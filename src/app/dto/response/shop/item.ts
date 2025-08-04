export interface ItemResponseDto {
  status: ItemResponseStatus;
  items: ItemDto[];
}

export interface ItemDto {
  id: number;
  title: string;
  description: string;
  price: string;
  attributes: AttributeDto[];
}

export interface AttributeDto {
  color: ColorResponse;
  size: SizeResponse;
  urls: UrlResponse[]
}

export interface SizeResponse {
size: string; 
}

export interface ColorResponse{ 
color: string; 
}

export interface UrlResponse {
  url: string;
}

export enum ItemResponseStatus {
  SUCCESS = 'SUCCESS',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}
