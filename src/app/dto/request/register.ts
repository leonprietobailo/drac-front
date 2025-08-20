export interface UserRequestDto {
  email: string;
  password: string;
  newsletter: boolean;
  firstName: string;
  lastName: string;
  birthdate: Date;
  phone: string;
  totp: string;
  address: AddressRequestDto;
}

export interface AddressRequestDto {
  city: string;
  province: string;
  streetNumber: string;
  blockFlat: string;
  postalCode: string;
}

export interface TotpRequestDto {
  email: string;
  firstName: string;
}
