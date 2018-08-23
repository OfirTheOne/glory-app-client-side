import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AgentAuthService, OrderService, LoadingService } from '../../../services';
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
        if(this.authService.isSignIn()) {
            const loading = this.loadingService.presentLoadingAlert();
            const orderRes = await this.orders$;
            console.log(orderRes);
            loading.dismiss();
        }
    }
}
