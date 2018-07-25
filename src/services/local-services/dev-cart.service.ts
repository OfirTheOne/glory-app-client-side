import { Injectable } from '@angular/core';
import * as moment from 'moment';

// import { Product } from '../../models/product.interface';
import { CartProduct } from '../../models/store-models/cart-product.interface';

/** 
 * This service store cart products and implement a sodu caching behavior.
 * 
 * 
 * To improve preformens beside the  cartProducts array, we will manage  a producrs map, 
 * in each insertion we will 
 */
@Injectable()
export class DevCartService {
    private readonly updateTimeOut = 15 * 60; // every 15 min will request the list from the db

    private lastProductsRequestTimeStamp: number = null;
    private productsMap: Map<ProductMapKey, CartProduct> = new Map<ProductMapKey, CartProduct>();

    private cartProducts: CartProduct[] = []

    constructor() { }


    // public async getCartProducts(): Promise<CartProduct[]> {
    //     try {
    //         // if pass T.O update wishListProducts
    //         if (this.shouldeGetUpdatedList(this.lastProductsRequestTimeStamp)) {
    //             this.cartProducts = await this.mainController.getUserCart();
    //             this.toProductMap(this.cartProducts)
    //             this.setLastProductsRequestTimeStamp();
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    //     return 
    // }

/*
    private addPoductToMap(key: ProductMapKey,product: CartProduct) {
        if(this.productsMap.has(key)) {

        } else {
            this.productsMap.set(key, product);
        }
    }


    private toProductMap(products: CartProduct[]) {
        products.forEach((product: CartProduct) => {
            const key: ProductMapKey = this.productToKey(product);
            this.productsMap.set(key, product);
        })
    }



    private productToKey(product: CartProduct): ProductMapKey {
        const pid = product.product._id;
        const size = product.size;
        return toProductMapKey(pid, toProductSize(size));
    }

    private setLastProductsRequestTimeStamp() {
        this.lastProductsRequestTimeStamp = moment().unix();
    }

    private shouldeGetUpdatedList(requestTimeStamp: number): boolean {
        if (requestTimeStamp === null) {
            return true;
        }
        const timeOut = moment().add(this.updateTimeOut, 'seconds');
        const shoulde = moment(requestTimeStamp, 'seconds').isAfter(timeOut, 'seconds');
        return shoulde;
    }
       */
}


/** 
 * interface ProductMapKey
 * method toProductMapKey
 */
// type that define a uniqe key for each product in the map.
interface ProductMapKey {
    pid: string,
    size: ProductSize
}
// safe parse to ProductMapKey
const toProductMapKey = (pid: string, size: string): ProductMapKey => {
    return { pid, size: toProductSize(size) };
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