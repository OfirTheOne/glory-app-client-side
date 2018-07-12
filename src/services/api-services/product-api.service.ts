import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { HttpService } from './http.service';
import { EnvironmentService } from '../environment/environment.service';

import { ServerResponse } from './../../models/custom-auth-models/server-response.interface';
import { Product } from './../../models/store-models/product.interface';

@Injectable()
export class ProductApiService {

    private readonly curSubRoute = 'products/';

    constructor(private http: HttpService, private env: EnvironmentService) { }

    async getProductById(pid: string): Promise<ServerResponse<Product>> {
        console.log(`getProductById(${pid})`);
        const queryUrl = this.env.get('API_URL') + this.curSubRoute + pid;
            const res = await this.http.get<Product>(queryUrl);
            return res;


    }

    async getProductsByCategory(cat: string): Promise<ServerResponse<Product[]>> {

        console.log(`getProductsByCategory(${cat})`);
        const queryUrl = this.env.get('API_URL') + this.curSubRoute + 'cat/' + cat;
            const res = await this.http.get<Product[]>(queryUrl);
            return res;
    }

    async getProductsByFilterParams(params: HttpParams): Promise<ServerResponse<Product[]>> {
        console.log(`getProductsByFilterParams(${params})`);
        const queryUrl = this.env.get('API_URL') + this.curSubRoute + 'filter/q';
            const res = await this.http.get<Product[]>(queryUrl, undefined, params);
            return res;
    }

    /* only Admin
    async deleteProductById(pid: string)
    : Promise <HttpResponse<ServerResponses<Product>>> {

        console.log(`deleteProductById(${pid})`);
        const queryUrl = apiUrl + this.curSubRoute + pid;
        try {
            const res = await this.httpClient.delete<ServerResponses<Product>>(queryUrl, { observe: 'response' }).toPromise();
            return res;
        } catch (e) {
            throw e;
        }
    }
    */

}