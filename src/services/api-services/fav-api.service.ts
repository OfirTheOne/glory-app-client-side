import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { HttpService } from './http.service';
import { EnvironmentService } from '../environment/environment.service';

import { ServerResponse } from '../../models/custom-auth-models/server-response.interface';
import { Product } from '../../models/store-models/product.interface';

@Injectable()
export class FavApiService {

    private readonly curSubRoute = 'users/wish/';

    constructor(
        private http: HttpService,
        private env: EnvironmentService) { }

    async getUserWish(headers: HttpHeaders): Promise<ServerResponse<{ wishList: string[] }>> {
        console.log(`getUserWish(${headers})`);
        const queryUrl = this.env.get('API_URL') + this.curSubRoute;
        const result = await this.http.get<{ wishList: string[] }>(queryUrl, headers);
        return result;
    }

    async getUserWishProducts(headers: HttpHeaders): Promise<ServerResponse<Product[]>> {
        console.log(`getUserWishProducts(${headers})`);
        const queryUrl = this.env.get('API_URL') + this.curSubRoute + 'products/';
        const result = await this.http.get<Product[]>(queryUrl, headers);
        return result;
    }

    async postProductsToWish(headers: HttpHeaders, requestBody: { pid: string }): Promise<void> {
        console.log(`postProductsToWish(${headers}, ${requestBody})`);
        const queryUrl = this.env.get('API_URL') + this.curSubRoute;
        const result = await this.http.post(queryUrl, requestBody, headers);
        console.log(result)
    }

    async deleteProductFromWish(headers: HttpHeaders, pid: string): Promise<void> {
        console.log(`deleteProductFromWish(${headers}, ${pid})`);
        const queryUrl = this.env.get('API_URL') + this.curSubRoute + pid;
        const result = await this.http.delete(queryUrl, headers);
        console.log(result)
    }
}