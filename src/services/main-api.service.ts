import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { AgentAuthService } from './auth/agent-auth.service';
import { ProductApiService } from './api-services/product-api.service';
import { CartApiService } from './api-services/cart-api.service';
import { FavApiService } from './api-services/fav-api.service';

import { CartProduct } from '../models/store-models/cart-product.interface';
import { Product } from '../models/store-models/product.interface';
import { Cart } from '../models/store-models/cart.interface';

export const apiUrl = 'https://agile-harbor-28902.herokuapp.com/';

@Injectable()
export class MainApiService {

    logOutEvent: Subject<void> = new Subject<void>();

    constructor(
        private authService: AgentAuthService,
        private productApi: ProductApiService,
        private cartApi: CartApiService,
        private favApi: FavApiService) { }


/*
    // *** auth ***
    isLoggedin(): boolean {
        return this.authController.isLoggedIn();
    }

    logInUser(email: string, password: string): Promise<boolean> {
        return this.authController.login(email, password);
    }

    async logOutUser(): Promise<Boolean> {
        const res = await this.authController.logout();
        this.logOutEvent.next();
        return res;
    }

    signUpaUser(email: string, password: string): Promise<boolean> {
        return this.authController.signup(email, password);
    }
*/


    // *** product ***
    // no auth needed
    async getProductById(pid: string): Promise<Product> {
        const res = await this.productApi.getProductById(pid);
        return res.data;
    }

    // no auth needed    
    async getProductsByCategory(category: string): Promise<Product[]> {
        const res = await this.productApi.getProductsByCategory(category);
        return res.data;
    }

    // no auth needed        
    async getFilteredProducts(filterParams:
        { view: string, category: string, sort: string, min?: string, max?: string })
        : Promise<Product[]> {
        const params = new HttpParams({ fromObject: filterParams });
        const res = await this.productApi.getProductsByFilterParams(params);
        return res.data

    }



    // *** cart ***
    // async getUserCart(): Promise<CartProduct[]> {
    //     try {
    //         if (this.authService.isSignIn()) {
    //             const header = this.authService.getAuthHeader()
    //             const res = await this.cartApi.getUserCart(header);
    //             console.log(res.data);
    //             return res.data;
    //         }
    //     } catch (e) {
    //         throw e;
    //     }
    // }


    // async addProductToCart(pid: string, size: string): Promise<void> {
    //     try {
    //         if (this.authService.isSignIn()) {
    //             const header = this.authService.getAuthHeader()
    //             await this.cartApi.postProductsToCart(header, { pid, size });
    //         }
    //     } catch (e) {
    //         throw e;
    //     }
    // }


    // async removeProductFromCart(deleteParams: {pid: string, size: string}): Promise<void> {
    //     const params = new HttpParams({ fromObject: deleteParams });
    //     try {
    //         if (this.authService.isSignIn()) {
    //             const header = this.authService.getAuthHeader()
    //             await this.cartApi.deleteProductFromCart(header, params);
    //         }
    //     } catch (e) {
    //         throw e;
    //     }
    // }

    

    // *** wish ***
    async getUserWish(): Promise<{ wishList: string[] }> {
        try {
            if (this.authService.isSignIn()) {
                const header = this.authService.getAuthHeader()
                const res = await this.favApi.getUserWish(header);
                return res.data;
            }
        } catch (e) {
            throw e;
        }
    }


    async getUserWishProducts(): Promise<Product[]> {
        try {
            if (this.authService.isSignIn()) {
                const header = this.authService.getAuthHeader()
                const res = await this.favApi.getUserWishProducts(header);
                return res.data;
            }
        } catch (e) {
            throw e;
        }
    }


    async addProductToWish(pid: string): Promise<void> {
        try{
            if (this.authService.isSignIn()) {
                const header = this.authService.getAuthHeader();
                await this.favApi.postProductsToWish(header, { pid });
            }
        } catch(e) {
            throw e;
        }
    }


    async removeProductFromWish(pid: string): Promise<void> {
        try {
            if (this.authService.isSignIn()) {
                const header = this.authService.getAuthHeader();
                await this.favApi.deleteProductFromWish(header, pid);
            }
        } catch (e) {
            throw e;
        }
    }
}
