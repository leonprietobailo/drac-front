export interface LoginResponseDto {
    token: string;
}

export interface LogoutResponseDto {
    status: LogoutResponseStatus;
}

export enum LogoutResponseStatus {
        SUCCESS,
    INVALID_TOKEN,
    UNEXPECTED_ERROR
}