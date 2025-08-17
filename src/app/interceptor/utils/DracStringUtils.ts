export class DracStringUtils {
    static formatPrice(price: number): string {
        return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(price);
    }
}