import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

import { HttpService } from './http.service';
import { EnvironmentService } from './../environment/environment.service';

import { OrderProduct, DeliveryAddress, Order } from '../../models/order';
import { ServerResponse } from './../../models/custom-auth-models/server-response.interface';
import { AuthResponse } from '../../models/custom-auth-models/auth-response.interface';
import { UserDataBase } from '../../models/user-data-base.interface';


@Injectable()
export class OrderApiService {

    private readonly curSubRoute = 'users/order/';
    private rootRoute: string;

    constructor(
        private http: HttpService, 
        private env: EnvironmentService,
        private httpClient: HttpClient) { 
        this.rootRoute = this.env.get('API_URL');
    }

    public async postOrder(headers: HttpHeaders, requestBody: PostOrderRequestBody) {

        // const requestBody = {orderProducts, deliveryAddress, deliveryOption}
        console.log(`postOrder(${headers}, ${requestBody})`);
        const queryUrl = this.rootRoute + this.curSubRoute;
        try {
            const res = await this.httpClient.post<
                ServerResponse<{ order: any, authValue: string, user: UserDataBase }>
            >(queryUrl, requestBody,{ headers, observe: 'response' }).toPromise();
            console.log(res);
            return res.body.data;

        } catch (error) {
            console.log(error);
        }
    }

    public async getOrders (headers: HttpHeaders) {
        console.log(`getOrders(${headers})`);
        const queryUrl = this.rootRoute + this.curSubRoute;
        const result = await this.http.get<Order[]>(queryUrl, headers);
        console.log(result);
        return result.data;
    }

}

interface PostOrderRequestBody {
        orderProducts: OrderProduct[], 
        deliveryAddress: DeliveryAddress, 
        deliveryOption: string,
        sourceId: string,
        metadata: Object,
        paymentMethod: string
}