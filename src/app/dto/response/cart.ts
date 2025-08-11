export interface AddResponseDto {
    status: AddResponseStatus; 
}

export enum AddResponseStatus {
  SUCCESS = 'SUCCESS',
  MERGED = 'MERGED',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}
