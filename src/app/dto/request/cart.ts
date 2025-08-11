export interface AddRequestDto {
    productId: number;
    sizeId: number | undefined;
    colorId: number | undefined;
    quantity: number;
}