export interface ItemResponseDto {
  status: ItemResponseStatus;
  items: ItemDto[];
}

export interface ItemDto {
  id: number;
  title: string;
  description: string;
  price: number;
  colors: ColorDto[];
  sizes: SizeDto[];
  images: ImageDto[];
}

export interface SizeDto {
  id: number;
  size: string;
}

export interface ColorDto {
  id: number;
  color: string;
  images: ImageDto[];
}

export interface ImageDto {
  url: string;
}

export enum ItemResponseStatus {
  SUCCESS = 'SUCCESS',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}
