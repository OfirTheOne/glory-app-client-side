import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { HttpService } from './http.service';
import { EnvironmentService } from './../environment/environment.service';

import { ServerResponse } from './../../models/custom-auth-models/server-response.interface';
import { CartProduct } from '../../models/store-models/cart-product.interface';

@Injectable()
export class CartApiService {

    private readonly curSubRoute = 'users/cart/';
    private rootRoute: string;

    constructor(private http: HttpService, private env: EnvironmentService) { 
        this.rootRoute = this.env.get('API_URL');
    }

    async getUserCart(headers: HttpHeaders): Promise<ServerResponse<CartProduct[]>> {
        console.log(`getUserCart(${headers})`);
        const queryUrl = this.rootRoute + this.curSubRoute + 'products/';
        const result = await this.http.get<CartProduct[]>(queryUrl, headers);
        console.log(result);
        return result;
    }

    async postProductsToCart(headers: HttpHeaders, requestBody: { pid: string, size: string }): Promise<void> {
        console.log(`postProductsToCart(${headers}, ${requestBody})`);
        const queryUrl = this.rootRoute + this.curSubRoute;
        const result = await this.http.post(queryUrl, requestBody, headers);
        console.log(result);

    }

    async deleteProductFromCart(headers: HttpHeaders, deleteParams: { pid: string, size: string }): Promise<void> {
        console.log(`deleteProductFromCart(${headers}, ${deleteParams})`);
        const queryUrl = this.rootRoute + this.curSubRoute + 'q';
        const params = new HttpParams({ fromObject: deleteParams });
        const result = await this.http.delete(queryUrl, headers, params);
        console.log(result);

    }
}