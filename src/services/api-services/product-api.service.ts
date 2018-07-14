import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { HttpService } from './http.service';
import { EnvironmentService } from '../environment/environment.service';

import { ServerResponse } from './../../models/custom-auth-models/server-response.interface';
import { Product } from './../../models/store-models/product.interface';

@Injectable()
export class ProductApiService {

    private readonly curSubRoute = 'products/';
    private rootRoute: string;

    constructor(private http: HttpService, private env: EnvironmentService) {
        this.rootRoute = this.env.get('API_URL');
     }

    async getProductById(pid: string): Promise<ServerResponse<Product>> {
        console.log(`getProductById(${pid})`);
        const queryUrl = this.rootRoute + this.curSubRoute + pid;
        const result = await this.http.get<Product>(queryUrl);
        return result;
    }

    async getProductsByCategory(cat: string): Promise<ServerResponse<Product[]>> {
        console.log(`getProductsByCategory(${cat})`);
        const queryUrl = this.rootRoute + this.curSubRoute + 'cat/' + cat;
        const result = await this.http.get<Product[]>(queryUrl);
        return result;
    }

    async getProductsByFilterParams(params: HttpParams): Promise<ServerResponse<Product[]>> {
        console.log(`getProductsByFilterParams(${params})`);
        const queryUrl = this.rootRoute + this.curSubRoute + 'filter/q';
        const result = await this.http.get<Product[]>(queryUrl, undefined, params);
        return result;
    }
}