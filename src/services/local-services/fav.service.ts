import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { MainApiService } from '../main-api.service';

import { Product } from '../../models/store-models/product.interface';
import { AgentAuthService } from '../auth/agent-auth.service';
import { FavApiService } from '../api-services/fav-api.service';
import { ServerResponse } from '../../models/custom-auth-models/server-response.interface';


/** 
 * This service store wish products and implement a sodu caching behavior.
 */
@Injectable()
export class FavService {
    private readonly updateTimeOut = 15 * 60; // every 15 min will request the list from the db

    lastIdsRequestTimeStamp: number = null;
    lastProductsRequestTimeStamp: number = null;
    wishListIds: string[] = [];
    wishListProducts: Product[] = []

    constructor(
        private authService: AgentAuthService,
        private favApi: FavApiService,
        private mainController: MainApiService) { }

    // *********** shallow ids *********** //

    // actions

    public async getWishList(): Promise<string[]> {
        try {
            // if pass T.O update wishListIds
            if (this.authService.isSignIn()) {
                if (this.shouldeGetUpdatedList(this.lastIdsRequestTimeStamp)) {
                    const header = this.authService.getAuthHeader();
                    const result = await this.favApi.getUserWish(header);
                    this.wishListIds = result.data.wishList;
                    this.setLastIdsRequestTimeStamp();
                }
            }
        } catch (e) {
            console.log(e);
        }
        return this.wishListIds;
    }

    public async getWishListProducts(): Promise<Product[]> {
        try {
            // if pass T.O update wishListProducts
            if (this.authService.isSignIn()) {
                if (this.shouldeGetUpdatedList(this.lastProductsRequestTimeStamp)) {
                    const header = this.authService.getAuthHeader();
                    const result = await this.favApi.getUserWishProducts(header);
                    this.wishListProducts = result.data;
                    this.setLastProductsRequestTimeStamp();
                }
            }
        } catch (error) {
            console.log(error);
        }
        return this.wishListProducts;
    }

    public async addProductToWish(product: Product) {
        // first action add, UX consideration
        const pid = product._id;
        this.pushToArray(this.wishListIds, pid);
        try {
            if (this.authService.isSignIn()) {
                const header = this.authService.getAuthHeader();
                await this.favApi.postProductsToWish(header, { pid });
            }
            this.pushToArray(this.wishListProducts, product);
        } catch (e) {
            console.log(e);
            // if add action failed adding back to the wishListIds
            this.removeFromArray(this.wishListIds, pid);
        }
    }

    public async removeProductFromWish(product: Product) {
        // first action remove, UX consideration
        const pid = product._id;
        this.removeFromArray(this.wishListIds, pid);
        try {
            if (this.authService.isSignIn()) {
                const header = this.authService.getAuthHeader();
                await this.favApi.deleteProductFromWish(header, pid);
                this.removeFromArray(this.wishListProducts, product);
            }
        } catch (e) {
            console.log(e);
            // if remove action failed adding back to the wishListIds
            this.pushToArray(this.wishListIds, pid);
        }
    }


    public isWish(productId: string): boolean {
        // return this.wishListIds.includes(productId);
        return this.wishListIds.indexOf(productId) > -1;
    }


    // cache data 

    // when user signout
    public flushWishService() {
        this.lastIdsRequestTimeStamp = null;
        this.lastProductsRequestTimeStamp = null;
        this.wishListIds = [];
        this.wishListProducts = [];
    }

    private setLastIdsRequestTimeStamp() {
        this.lastIdsRequestTimeStamp = moment().unix();
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


    // mutate the arr object to the same array only without 'remove' element  
    // only if 'remove' element  exists in arr
    private removeFromArray<T>(arr: T[], remove: T) {
        if (arr !== null) {
            const index = arr.indexOf(remove)
            index > -1 ? arr.splice(index, 1) : null;
        }
    }

    private pushToArray<T>(array: T[], newElement: T) {
        if (array !== null) {
            array.push(newElement);
        }
    }

  














    



/*
    async authGard(callback: (header, parameters?)=>Promise<any>, params? : any[]) {
        try {
            if (this.authService.isSignIn()) {
                const header = this.authService.getAuthHeader();
                const result =  await callback(header, ...params);
                return result? result.data : undefined;
            }
        } catch (e) {
            throw e;
        }
    }

  */


    // *** wish ***
    //  async getUserWish(): Promise<{ wishList: string[] }> {
    //     await this.authGard(this._)

    //     try {
    //         if (this.authService.isSignIn()) {
    //             const header = this.authService.getAuthHeader()
    //             const res = await this.favApi.getUserWish(header);
    //             return res.data;
    //         }
    //     } catch (e) {
    //         throw e;
    //     }
    // }


    // async getUserWishProducts(): Promise<Product[]> {
    //     try {
    //         if (this.authService.isSignIn()) {
    //             const header = this.authService.getAuthHeader()
    //             const res = await this.favApi.getUserWishProducts(header);
    //             return res.data;
    //         }
    //     } catch (e) {
    //         throw e;
    //     }
    // }


    // async addProductToWish(pid: string): Promise<void> {
    //     try{
    //         if (this.authService.isSignIn()) {
    //             const header = this.authService.getAuthHeader();
    //             await this.favApi.postProductsToWish(header, { pid });
    //         }
    //     } catch(e) {
    //         throw e;
    //     }
    // }


    // async _removeProductFromWish(pid: string): Promise<void> {
    //     try {
    //         if (this.authService.isSignIn()) {
    //             const header = this.authService.getAuthHeader();
    //             await this.favApi.deleteProductFromWish(header, pid);
    //         }
    //     } catch (e) {
    //         throw e;
    //     }
    // }




}