import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { AgentAuthService } from './../auth/agent-auth.service';
import { CartApiService } from './../api-services/cart-api.service';

import { CartProduct } from '../../models/store-models/cart-product.interface';

/** 
 * This service store cart products and implement a sodu caching behavior.
 */
@Injectable()
export class CartService {
    private readonly updateTimeOut = 4 * 60; // every 4 min will request the cart from the db

    private lastProductsRequestTimeStamp: number = null;
    private cartProducts: CartProduct[] = []

    constructor(
        private authService: AgentAuthService,
        private cartApi: CartApiService) { }


    public async getCartProducts(): Promise<CartProduct[]> {
        try {
            // if pass T.O update wishListProducts
            if (this.authService.isSignIn()) {
                if (this.shouldeGetUpdatedList(this.lastProductsRequestTimeStamp)) {
                    const header = this.authService.getAuthHeader()
                    const result = await this.cartApi.getUserCart(header);
                    this.cartProducts = result.data;
                    console.log(this.cartProducts);
                    this.setLastProductsRequestTimeStamp();
                }    
            }
        } catch (error) {
            console.log(error);
             // 'user_verification_error'
            await this.authService.onSignOut();
            this.flushCartService();
        }
        return this.cartProducts;
    }

    public async addProductToCart(cartProduct: CartProduct): Promise<void> {

        this.insertToCartArray(cartProduct);
        const pid = cartProduct.product._id;
        const { size } = cartProduct;
        try {
            if (this.authService.isSignIn()) {
                const header = this.authService.getAuthHeader()
                await this.cartApi.postProductsToCart(header, { pid, size });
            }
        } catch (error) {
            console.log(error);
            this.deleteFromCartArray(cartProduct);
            await this.authService.onSignOut();
            this.flushCartService();
        }
    }

    // private isCartProduct(cartProduct: CartProduct | {product: Product, size: string}):  cartProduct is CartProduct {
    //     return (<CartProduct>cartProduct).amount !== undefined;
    // }

    public async removeProductFromCart(cartProduct: CartProduct) {
        const pid = cartProduct.product._id;
        const { size } = cartProduct;
        this.deleteFromCartArray(cartProduct);
        try {
            if (this.authService.isSignIn()) {
                const header = this.authService.getAuthHeader()
                await this.cartApi.deleteProductFromCart(header, { pid, size });
            }
        } catch (error) {
            console.log(error);
            this.insertToCartArray(cartProduct);
            await this.authService.onSignOut();
            this.flushCartService();
        }
    }


    public getTotalCost(): number {
        let total = 0;
        if (this.cartProducts.length > 0) {
            total = this.cartProducts.reduce((acc, cur) => {
                return acc += cur.amount * cur.product.price;

            }, 0);
        }
        return total;
    }


    public isDataRequestAsync(): boolean {
        return this.shouldeGetUpdatedList(this.lastProductsRequestTimeStamp);
    }

    // cache

    // when user signout
    public flushCartService() {
        this.lastProductsRequestTimeStamp = null;
        this.cartProducts = [];
    }

    /* private */

    private insertToCartArray(cartProduct: CartProduct) {
        const foundCartProduct = this.cartProducts.find((element) => {
            return element.product._id === cartProduct.product._id &&
                element.size === cartProduct.size;
        });
        if (foundCartProduct) {
            foundCartProduct.amount++;
        } else {
            cartProduct.amount = 1;
            cartProduct.insertionDate - new Date().getTime();
            this.cartProducts.push(cartProduct);
        }
    }

    private deleteFromCartArray(cartProduct: CartProduct) {
        const indexProduct = this.cartProducts.findIndex((element) => {
            return element.product._id === cartProduct.product._id &&
                element.size === cartProduct.size;
        });
        if (indexProduct >= 0) {
            const foundCartProduct = this.cartProducts[indexProduct];
            console.log(foundCartProduct.amount);
            if (foundCartProduct.amount > 1) {
                foundCartProduct.amount--;
            } else {
                this.cartProducts.splice(indexProduct, 1);
            }
        } else {
            throw new Error('can\'t find the product in the cart');
        }
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

}
