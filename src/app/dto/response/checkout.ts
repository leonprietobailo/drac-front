export interface ShippingResponseDto {
    status: ShippingResponseStatus;
    addresses: AddressDto[];
    billingInfos: BillingInfoDto[];
    recipients: RecipientDto[];
}

export enum ShippingResponseStatus {
    SUCCESS = 'SUCCESS',
    UNAUTHORIZED = 'UNAUTHORIZED',
    UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',

    PENDING = 'PENDING'
}

export interface AddressDto {
    type: 'AddressDto';
    id: number;
    city: string;
    province: string;
    street: string;
    flat: string;
    zip: string;
    starred: boolean;
}

export interface BillingInfoDto {
    type: 'BillingInfoDto';
    id: number;
    entityName: string;
    email: string;
    taxId: string;
    starred: boolean;
}

export interface RecipientDto {
    type: 'RecipientDto';
    id: number;
    name: string;
    surname: string;
    phone: string;
    starred: boolean;
}

export interface RecipientResponseDto {
    status: RecipientResponseStatus;
    recipient: RecipientDto;
}

export enum RecipientResponseStatus {
    SUCCESS = 'SUCCESS',
    UNAUTHORIZED = 'UNAUTHORIZED',
    UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',

    PENDING = 'PENDING'
}

export interface AddressResponseDto {
    recipient(recipient: any): unknown;
    status: AddressResponseStatus;
    address: AddressDto;
}

export enum AddressResponseStatus {
    SUCCESS = 'SUCCESS',
    UNAUTHORIZED = 'UNAUTHORIZED',
    UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',

    PENDING = 'PENDING'
}

export interface BillingResponseDto {
    recipient(recipient: any): unknown;
    status: BillingResponseStatus;
    billing: BillingInfoDto;
}

export enum BillingResponseStatus {
    SUCCESS = 'SUCCESS',
    UNAUTHORIZED = 'UNAUTHORIZED',
    UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',

    PENDING = 'PENDING'
}