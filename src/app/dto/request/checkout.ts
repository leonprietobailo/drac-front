import { CartDto } from "../response/cart";
import { AddressDto, BillingInfoDto, RecipientDto } from "../response/checkout";

export interface RequestPaymentDto {
    type: ShipmentTypes;
    recipient: RecipientDto;
    address?: AddressDto;

    requestBilling: boolean;
    billingInfo?: BillingInfoDto;
    billingAddress?: AddressDto;

    cart: CartDto;
}

export enum ShipmentTypes {
    POINT = 'POINT',
    ADDRESS = 'ADDRESS'
}