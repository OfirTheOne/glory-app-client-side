import { Product } from "./product.interface";

export interface CartProduct {
    product: Product
    insertionDate?: number,
    size: string,
    amount?: number
}


/** 
 * enum ProductSize
 * method toProductSize
 */
// all acceptable values of product size
enum ProductSize {
    Small = "S",
    Medium = "M",
    Larg = "L",
    ExtraLarge = "XL",
    OneSize = "O"
}
// safe parse to ProductSize
const toProductSize = (size: string): ProductSize => {
    switch (size) {
        case 'S': return ProductSize.Small;
        case 'M': return ProductSize.Medium;
        case 'L': return ProductSize.Larg;
        case 'XL': return ProductSize.ExtraLarge;
        case 'O': return ProductSize.OneSize;
        default: throw new Error('size value is not valid.')
    }
}