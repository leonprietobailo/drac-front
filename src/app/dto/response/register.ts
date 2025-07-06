export interface TotpResponseDto {
  status: TotpResponseStatus;
}

export enum TotpResponseStatus {
  SUCCESS = 'SUCCESS',
  TOO_MANY_TOTPS = 'TOO_MANY_TOTPS',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}

export enum UserResponseStatus {
  SUCCESS = 'SUCCESS',
  WRONG_TOTP = 'WRONG_TOTP',
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  TOTP_EXPIRED = 'TOTP_EXPIRED',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}
