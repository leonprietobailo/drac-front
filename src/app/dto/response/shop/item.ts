export interface ItemResponseDto {
  status: ItemResponseStatus;
  items: ItemDto[];
}

export interface ItemDto {
  id: number;
  title: string;
  price: string;
  colors: ItemColorDto[];
}

export interface ItemColorDto {
  color: string;
  url: string;
}

export enum ItemResponseStatus {
  SUCCESS = 'SUCCESS',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}

export enum ItemResponseColors {
  UNDEFINED = 'UNDEFINED', // Serves as undefined color placeholder.
}
