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
    id: number;
    city: string;
    province: string;
    street: string;
    flat: string;
    zip: string;
    starred: boolean;
}

export interface BillingInfoDto {
    id: number;
    entityName: string;
    email: string;
    taxId: string;
    starred: boolean;
}

export interface RecipientDto {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    starred: boolean;
}
