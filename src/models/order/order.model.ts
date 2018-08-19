import { OrderProduct } from './order-product.model';
import { DeliveryAddress } from './delivery-address.model';

export interface Order {
    orderProducts: OrderProduct[],
    deliveryAddressDetails: {
        deliveryAddress: DeliveryAddress, 
        deliveryOption: String
        deliveryFeed: number
    },
    total: number,
    paid: boolean,
    paymentDetails: {
        paymentMethod: string
    },
}