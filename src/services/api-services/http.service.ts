import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerResponse } from '../../models/custom-auth-models/server-response.interface';


@Injectable()

export class HttpService {
    constructor(private httpClient: HttpClient) { }

    async post(queryUrl: string, requestBody: object, headers?: HttpHeaders, params?: HttpParams) {

        let result: HttpResponse<any>;
        try {
            result = await this.httpClient.post(queryUrl, requestBody, { 
                observe: 'response', 
                responseType: 'text', 
                headers, 
                params 
            }).toPromise();
            const body = result.body;
            return body;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async get<T>(queryUrl: string,  headers?: HttpHeaders, params?: HttpParams): Promise<ServerResponse<T>> {
        let result: HttpResponse<ServerResponse<T>>;

        try {
            result = await this.httpClient.get<ServerResponse<T>>(queryUrl, { 
                observe: 'response', 
                headers, 
                params 
            }).toPromise();
            const body = result.body;
            return body;
        } catch (error) {
            console.log(error);
            throw error;            
        }
    }

    async delete(queryUrl: string, headers?: HttpHeaders, params?: HttpParams) {
        let result: HttpResponse<any>;

        try {
            result = await this.httpClient.delete(queryUrl, { 
                observe: 'response', 
                responseType: 'text', 
                headers, 
                params 
            }).toPromise();
            const body = result.body;
            return body;
        } catch (error) {
            console.log(error);
            throw error;            
        }
    }

}