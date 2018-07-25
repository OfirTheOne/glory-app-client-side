import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';

import { SignInPage } from '../auth/sign-in/sign-in';
import { SignUpPage } from '../auth/sign-up/sign-up';
import { ItemPage } from '../item/item';
import { LoadPage } from './../load/load';

import { AgentAuthService } from './../../services/auth/agent-auth.service';
import { FavService } from '../../services/local-services/fav.service';

import { Product } from '../../models/store-models/product.interface';


@IonicPage()
@Component({
  selector: 'page-fav',
  templateUrl: 'fav.html',
})
export class FavPage {
  signInPage = SignInPage;
  signUpPage = SignUpPage;
  isUserSign;

  laodingModal: Modal;


  favProducts: Product[] = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private favService: FavService,
    private authService: AgentAuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavPage');
  }

  async ionViewWillEnter() {

    this.isUserSign = this.authService.isSignIn();
    if (this.isUserSign) {
      const laodingModal = this.showLoadingPage();

      try {
        const result = await this.favService.getWishListProducts();
        this.favProducts = result;
        laodingModal.dismiss();

      } catch (error) {
        console.log(error);
        laodingModal.dismiss();

      }
      console.log(this.favProducts);
    }
  }

  public onGotoSignInPage() {
    const modal = this.presentModal(SignInPage);
    modal.onDidDismiss(() => {
      console.log('...');
    });
  }

  public onGotoSignUpPage() {
    const modal = this.presentModal(SignUpPage);

  }

  public isUserSignedIn(): boolean {
    return this.authService.isSignIn();
  }

  public onViewItem(product: Product) {
    const modal = this.presentModal(ItemPage, product);
  }

  private presentModal(Page, params?) {
    const modal = this.modalCtrl.create(Page, params);
    modal.present();
    return modal;

  }

  private showLoadingPage(): Modal {
    const laodingModal = this.modalCtrl.create(LoadPage);
    laodingModal.present();
    return laodingModal;
  }


}
