
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { SignInPage } from '../auth/sign-in/sign-in';
import { SignUpPage } from '../auth/sign-up/sign-up';
import { PaymentPage } from './payment/payment';

import { AgentAuthService, CartService, TabNavService } from '../../services';
import { CartProduct } from '../../models/store-models/cart-product.interface';

import { isNullOrUndefined, isStringEmpty, allFiledsAre, not } from '../../utils'

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
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,

    private tabService: TabNavService,
    private authService: AgentAuthService,
    private cartService: CartService
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BagPage');
  }

  async ionViewWillEnter() {
    this.isUserSign = this.authService.isSignIn();
    try {
      if (this.isUserSign) {
        await this.setCartPageData();
      }
    } catch (e) {
      console.log(e);
    }
  }
  
  public isUserSignedIn(): boolean {
    return this.authService.isSignIn();
  }

  public onGotoSignInPage() {
    const modal = this.presentModal(SignInPage);
    modal.onDidDismiss(() => {
      console.log('Sign in page dismissed');
      this.tabService.dispatchOnSetSelectedTab();
    });
  }

  public onGotoSignUpPage() {
    const modal = this.presentModal(SignUpPage);
    modal.onDidDismiss(() => {
      console.log('Sign up page dismissed');
      this.tabService.dispatchOnSetSelectedTab();
    });
  }

  

  public async removeProductFromCart(cartProduct: CartProduct) {
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

  public onCheckOut() {
    const checkoutStatus = this.canUserCheckOut(); 
    if(!checkoutStatus.pass) {
      this.presentAlert({title: 'Can\'t Ceckout', subTitle: checkoutStatus.alertMessage });
    } else if(this.cart.length > 0) {
      const modal = this.presentModal(PaymentPage);
      modal.onWillDismiss(async (orderCompleted: boolean) => {
        if(orderCompleted) {
          console.log('Order Completed.');
          await this.setCartPageData(true);
        }
        console.log('PurchasePage dismissed.')
      })
    }

  }



  private async setCartPageData(forceUpdate?: boolean) {
    this.cart = await this.cartService.getCartProducts(forceUpdate);
    this.totalCartCost = this.cartService.getTotalCost();
  }

  // return the validation value in 'pass', and the message to present 
  // in case the user can'ot checkout.
  private canUserCheckOut() : {pass: boolean, alertMessage: string } {
    if(this.authService.isSignIn()) {

        const user = this.authService.getProfile();
        if(user) {
            const userAddress = user.address;
            const validAddress 
                =  !isNullOrUndefined(userAddress) 
                && allFiledsAre(userAddress, not(isNullOrUndefined)) 
                && allFiledsAre(userAddress, not(isStringEmpty))

            const validPayMethod = user.paymentMethods.sources.length > 0;
            if(validAddress && validPayMethod) {
              return {pass: true, alertMessage: ''}
            } else {
              return {
                pass: false, 
                alertMessage: 
                  `${validAddress? '' : 'invlide address details.'}` + 
                  `${validPayMethod? '' : '\ninvlide payment details.'}` 
              }
            }

        }
    
    } else {
      return {pass: false, alertMessage: 'unauthorized.'  };
    }
    
  }

  private presentModal(Page, data?: any) {
    console.log(Page);
    const modal = this.modalCtrl.create(Page, data);
    modal.present();
    return modal;
  }

  private goToPage(Page, params?) {
    return this.navCtrl.push(Page, params);
  }

  private presentAlert(options: {title: string, subTitle: string}) {
    let alert = this.alertCtrl.create({
      title: options.title,
      subTitle: options.subTitle,
      buttons: ['Got it']
    });
    alert.present();
  }
}


