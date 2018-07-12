import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { HttpService } from './http.service';
import { EnvironmentService } from './../environment/environment.service';

import { ServerResponse } from './../../models/custom-auth-models/server-response.interface';
import { CartProduct } from '../../models/store-models/cart-product.interface';
import { Cart } from '../../models/store-models/cart.interface';

@Injectable()
export class CartApiService {

    private readonly curSubRoute = 'users/cart/';

    constructor(private http: HttpService, private env: EnvironmentService) { }



    async getUserCart(headers: HttpHeaders)
        : Promise<ServerResponse<CartProduct[]>> {
        console.log(`getUserCart(${headers})`);
        const queryUrl = this.env.get('API_URL') + this.curSubRoute + 'products/';
        try {
            const res = await this.http.get<CartProduct[]>(queryUrl, headers);
            console.log(res);
            return res;
        } catch (e) {
            throw e;
        }

    }

    async postProductsToCart(headers: HttpHeaders, requestBody: { pid: string, size: string })
        : Promise<void> {
        console.log(`postProductsToCart(${headers}, ${requestBody})`);
        const queryUrl = this.env.get('API_URL') + this.curSubRoute;
        try {
            const res = await this.http.post(queryUrl, requestBody, headers);
            console.log(res);
        } catch (e) {
            throw e;
        }
    }

    async deleteProductFromCart(headers: HttpHeaders, deleteParams: { pid: string, size: string }): Promise<void> {
        console.log(`deleteProductFromCart(${headers}, ${deleteParams})`);
        const queryUrl = this.env.get('API_URL') + this.curSubRoute + 'q';
        const params = new HttpParams({ fromObject: deleteParams });
        try {
            const res = await this.http.delete(queryUrl, headers, params);
            console.log(res);
        } catch (e) {
            throw e;
        }
    }


}