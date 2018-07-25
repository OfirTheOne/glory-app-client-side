
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { SignInPage } from '../auth/sign-in/sign-in';
import { SignUpPage } from '../auth/sign-up/sign-up';

import { AgentAuthService } from '../../services/auth/agent-auth.service';
import { CartService } from './../../services/local-services/cart.service';
import { CartProduct } from './../../models/store-models/cart-product.interface';
import { PurchasePage } from './purchase/purchase';


@IonicPage()
@Component({
  selector: 'page-bag',
  templateUrl: 'bag.html',
})
export class BagPage {
  signInPage = SignInPage;
  signUpPage = SignUpPage;
  
  isUserSign: boolean = false;

  totalCartCost: number = 0;
  cart: CartProduct[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    
    private authService: AgentAuthService,
    private cartService: CartService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BagPage');
  }

  async ionViewWillEnter() {
    this.isUserSign = this.authService.isSignIn();
    try {
      if (this.isUserSign) {
        this.cart = await this.cartService.getCartProducts();
        this.totalCartCost = this.cartService.getTotalCost();
      }
    } catch (e) {
      console.log(e);
    }
  }
  
  isUserSignedIn(): boolean {
    return this.authService.isSignIn();
  }

  
  onGotoSignInPage() {
    const modal = this.modalCtrl.create(SignInPage);
    modal.present();
    modal.onDidDismiss(() => {
      console.log('...');
    });
  }

  onGotoSignUpPage() {
    const modal = this.modalCtrl.create(SignUpPage);
    modal.present();
  }


  async removeProductFromCart(cartProduct: CartProduct) {
    try {
      if (this.isUserSign) {
        console.log(cartProduct);
        await this.cartService.removeProductFromCart(cartProduct);
        this.totalCartCost = this.cartService.getTotalCost();
      }
    } catch (e) {
      console.log(e);
    }
  }

  public onChackOut() {
    if(this.cart.length > 0) {
      const modal = this.modalCtrl.create(PurchasePage);
      modal.present();
    }

  }

}
