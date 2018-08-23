import { Order } from './../../models/order/order.model';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { OrderApiService } from '../api-services/order.api.service';
import { AgentAuthService } from '../auth/agent-auth.service';

import { Product } from '../../models/store-models/product.interface';

@Injectable()
export class OrderService {

    constructor(
        private authService: AgentAuthService,
        private orderApi: OrderApiService) { }


    // actions

    // no auth needed    
    async getOrders(): Promise<Order[]> {
        if(this.authService.isSignIn()) {
            const headers = this.authService.getAuthHeader();
            try {
                const orders = await this.orderApi.getOrders(headers);
                console.log(orders);
                return orders;
            } catch (error) {
                console.log(error);
            }
        }
    }

    async postOrder(orderData): Promise<boolean> {
        if(this.authService.isSignIn()) {
            const headers = this.authService.getAuthHeader();
            try {
                const result = await this.orderApi.postOrder(headers, orderData);
                console.log(result);
                return true;
                // return orders;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
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