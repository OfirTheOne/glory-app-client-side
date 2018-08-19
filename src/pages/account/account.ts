import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { SignInPage } from '../auth/sign-in/sign-in';
import { SignUpPage } from '../auth/sign-up/sign-up';
// import { StoreViewbyPage } from './../store/store-viewby/store-viewby';

import { UserDetailsPage } from './user-details/user-details';
import { UserAddressPage } from './user-address/user-address';
import { PaymentMethodsPage } from './payment-methods/payment-methods';

import { AgentAuthService } from '../../services/auth/agent-auth.service';
import { TabNavService } from '../../services/tab-nav.service';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  name = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private tabService: TabNavService,
    private authService: AgentAuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  ionViewWillEnter() {
    if (this.isUserSignedIn()) {
      const user = this.authService.getProfile();
      this.name = user.personalData ? user.personalData.firstName : '';
    }
  }

  public isUserSignedIn(): boolean {
    return this.authService.isSignIn();
  }

  public onSignOut(){
    this.authService.onSignOut();
  }


  /*  page modal navigations  */

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

  public onGotoDetailsPage() {
    this.goToPage(UserDetailsPage);
  }

  public onGotoAddressPage() {
    this.goToPage(UserAddressPage);
  }

  public onGotoPaymentMethodPage() {
    this.goToPage(PaymentMethodsPage);
  }

  private presentModal(Page) {
    console.log(Page);
    const modal = this.modalCtrl.create(Page);
    modal.present();
    return modal;
  }

  private goToPage(Page, params?) {
    return this.navCtrl.push(Page, params);
  }

}
