import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, RadioGroup, RadioButton } from 'ionic-angular';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserApiService, AgentAuthService, OrderService, LoadingService } from '../../../services';
import { Order } from '../../../models/order';

@IonicPage()
@Component({
    selector: 'page-user-orders',
    templateUrl: 'user-orders.html',
})
export class UserOrdersPage {

    orders$: Promise<Order[]>
    constructor(
        private authService: AgentAuthService,
        private orderService: OrderService,
        private loadingService: LoadingService,
    ) { 
        this.orders$ = this.orderService.getOrders();

    }

    async ionViewDidLoad() {
        const loading = this.loadingService.presentLoadingAlert();
        const orderRes = await this.orders$; // = await this.orderService.getOrders();
        console.log(orderRes);
        loading.dismiss();
    }
}
