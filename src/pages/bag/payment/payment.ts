import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, AlertController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

import { AgentAuthService, CartService, OrderApiService } from '../../../services';
import { OrderProduct, DeliveryAddress, DeliveryOptions } from './../../../models/order';
import { CartProduct } from './../../../models/store-models/cart-product.interface';
import { AccountPage } from '../../account/account';
import { StripeSource } from './../../../models/user-data-base.interface';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  @ViewChild(Slides) slides: Slides;

  public products: CartProduct[] = [];
  public subtotal: number;
  public existingSources = [];

  public address;
  private selectedDeliveryOption: string;
  public deliveryFeed: number;

  private selectedPaymentMethod: string;
  private selectedSource: StripeSource;

  constructor(
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private authService: AgentAuthService,
    private cartService: CartService,
    private orderApiService: OrderApiService
  ) {
   }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
    this.slides.stopAutoplay();
    this.selectedDeliveryOption = DeliveryOptions.Standard; // defaulte
    this.deliveryFeed = 5; // defaulte
    this.existingSources = this.authService.getProfile().paymentMethods.sources;
    this.address =this.authService.getProfile().address;
    this.products = await this.cartService.getCartProducts();

    this.subtotal = this.products.reduce<number>((
      (sum, cartProduct) => 
        sum + cartProduct.product.price*cartProduct.amount
      ), 0); 
  }

  // slider functionality 
  public goToSlide(slideIndex) {
    this.slides.slideTo(slideIndex, 500);
  }

  public goToNextSlide() {
    const slideIndex = this.slides.getActiveIndex();
    if(this.validateSlideToNext(slideIndex)) {
      this.slides.slideNext(500);
    }
  }

  private validateSlideToNext(slideIndex: number) {
    switch (slideIndex) {
      case 0:
        return this.selectedDeliveryOption != undefined; 

      case 1:
        return true;

      case 2:
        return true;

      default:
        return false;
    }
  }

  public goToPrevSlide() {
    this.slides.slidePrev(500);
  }
  // ***************************** 

  // event / action 

  // form complited and submit
  public onSubmitOrder() {
    console.log(this.selectedDeliveryOption);
    const orderAlert = this.presentOrderConfirmAlert();
    orderAlert.onDidDismiss(async (data, role) => {
      if (role == 'cancel') {
        console.log('order chacked');

      } else {
        const orderData = await this.getOrderData();
        console.log(orderData);
        const headers = this.authService.getAuthHeader();
        const resulte = await this.orderApiService.postOrder(headers, orderData);
        console.log(resulte);
        console.log('order submited');
        this.goToNextSlide();
      }
    });
  }

  // confirm before submiting order
  private presentOrderConfirmAlert() {
    let alert = this.alertCtrl.create({
      title: 'Place Order',
      message: 'double checked all the details ?',
      buttons: [{ text: 'Continu', role: 'continu' }, { text: 'Cancel', role: 'cancel' }]
    });
    alert.present()
    return alert;
  }

  // construct the order object in the required format for the server  
  private async getOrderData() {
    const orderProducts: OrderProduct[] = this.products.map<OrderProduct>((cartProduct) => {
     return {
        amount: cartProduct.amount ? cartProduct.amount : 1,
        productId: cartProduct.product._id,
        size: cartProduct.size,
        pCode: cartProduct.product.pCode,
        price: cartProduct.product.price
      }
    });

    const { address } = this.authService.getProfile();
    const deliveryAddress: DeliveryAddress = {
      city : address.city,
      line1: address.address, 
      country: address.country,
      postal_code: address.postcode
    };

    const paymentMethod = 'credit-card'; 
  
    const total = this.subtotal + this.deliveryFeed;
    
    return {
      orderProducts,
      deliveryAddress,
      deliveryOption: this.selectedDeliveryOption, 
      sourceId: this.selectedSource.sourceId,
      metadata: { total },
      paymentMethod
    }

  }

  // delivery option radio button selected
  public onDeliveryOptionSelect(selectedValue) {
    console.log(selectedValue);
    this.deliveryFeed = (selectedValue == DeliveryOptions.Express? 10 : 5);
    this.selectedDeliveryOption = selectedValue;
  }

  // payment item selected / acrd or paypel.
  public onPaymentSourceSelected(paymentMethod, source) {
    this.selectedPaymentMethod = paymentMethod;
    this.selectedSource = source;
  }

  public onExit() {
    this.viewCtrl.dismiss();
  }
}
