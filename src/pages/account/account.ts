import { UserDataBase } from './../../models/user-data-base.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { SignInPage } from '../auth/sign-in/sign-in';
import { SignUpPage } from '../auth/sign-up/sign-up';
import { UserDetailsPage } from './user-details/user-details';
import { UserAddressPage } from './user-address/user-address';

import { AgentAuthService } from '../../services/auth/agent-auth.service';

import { Provider } from '../../models/provider.enum';
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  signInPage = SignInPage;
  signUpPage = SignUpPage;

  name = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
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




  /*  page modal navigations  */

  public onGotoSignInPage() {
    const modal = this.presentModal(SignInPage);
    modal.onDidDismiss(() => {
      console.log('...');
    });
  }

  public onGotoSignUpPage() {
    const modal = this.presentModal(SignUpPage);
    modal.onDidDismiss(() => {
      console.log('...');
    });
  }

  public onGotoDetailsPage() {
    this.goToPage(UserDetailsPage);
  }

  public onGotoAddressPage() {
    this.goToPage(UserAddressPage);
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
