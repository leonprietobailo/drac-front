export interface UserRequestDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  phone: string;
  totp: number;
  address: AddressRequestDto;
}

export interface AddressRequestDto {
  city: string;
  province: string;
  streetNumber: string;
  blockFlat: string;
  postalCode: number;
}

export interface TotpRequestDto {
  email: string;
}
