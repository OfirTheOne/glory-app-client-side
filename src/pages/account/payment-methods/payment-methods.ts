import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AgentAuthService, UserApiService } from '../../../services';

@IonicPage()
@Component({
  selector: 'page-payment-methods',
  templateUrl: 'payment-methods.html',
})
export class PaymentMethodsPage {

  existingSources = [];
  showCardForm: boolean;
  metadata;

  constructor(
    private authService: AgentAuthService,
    private userApi: UserApiService,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  public setShowCardForm() {
    this.showCardForm = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentMethodsPage');
    const user = this.authService.getProfile();
    this.existingSources = user.paymentMethods.sources; 
    this.metadata = {
      user_id: user._id,
      email: user.authData.email
    }
  }

  public async onCardSubmited(source) {
    console.log(source);
    if (this.authService.isSignIn()) {
      try {
        const result = await this.authService.onAddPaymentMethod(source);
        console.log('request resulte: ', result);
        console.log('updated user: ', this.authService.getProfile());
      } catch (error) {
        console.log(error)
      }
      
    }
  }

}
