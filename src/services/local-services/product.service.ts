import { HttpParams } from '@angular/common/http';
import { ProductApiService } from './../api-services/product-api.service';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Product } from '../../models/store-models/product.interface';

/** 
 * This service store wish products and implement a sodu caching behavior.
 */
@Injectable()
export class ProductService {
    private readonly updateTimeOut = 15 * 60; // every 15 min will request the list from the db

    lastIdsRequestTimeStamp: number = null;
    lastProductsRequestTimeStamp: number = null;
    products: Product[] = []

    constructor(private productApi: ProductApiService) { }


    // actions

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

    /*

    // cache data 

    // when user signout
    public flushWishService() {
        this.lastIdsRequestTimeStamp = null;
        this.lastProductsRequestTimeStamp = null;
        // this.wishListIds = [];
        // this.wishListProducts = [];
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

    */
}