export interface TotpResponseDto {
  status: TotpResponseStatus;
}

export enum TotpResponseStatus {
  SUCCESS = 'SUCCESS',
  TOO_MANY_TOTPS = 'TOO_MANY_TOTPS',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}
