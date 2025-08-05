export class ShopUtils {

    private constructor() { }

    // static filterUniqueSizes(sizes: SizeDto[] | undefined) {
    //     const seen = new Set<string>();
    //     if (!sizes) return [];
    //     return sizes.filter(attribute => {
    //         if (attribute.size == null) {
    //             return false;
    //         }
    //         if (seen.has(attribute.size.size)) {
    //             return false;
    //         }
    //         seen.add(attribute.size.size);
    //         return true;
    //     })
    // }

    // static filterUniqueColors(attributes: AttributeDto[] | undefined) {
    //     const seen = new Set<string>();
    //     if (!attributes) return [];
    //     return attributes.filter(attribute => {
    //         if (attribute.color == null) {
    //             return false;
    //         }
    //         if (seen.has(attribute.color.color)) {
    //             return false;
    //         }
    //         seen.add(attribute.color.color);
    //         return true;
    //     })
    // }



}