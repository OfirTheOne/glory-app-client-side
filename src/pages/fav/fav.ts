import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';

import { SignInPage } from '../auth/sign-in/sign-in';
import { SignUpPage } from '../auth/sign-up/sign-up';
import { ItemPage } from '../item/item';
import { LoadPage } from './../load/load';

import { AgentAuthService } from './../../services/auth/agent-auth.service';
import { FavService } from '../../services/local-services/fav.service';
import { TabNavService } from '../../services/tab-nav.service';

import { Product } from '../../models/store-models/product.interface';
import { StoreViewbyPage } from '../store/store-viewby/store-viewby';


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
    private tabService: TabNavService,
    private favService: FavService,
    private authService: AgentAuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavPage');
  }

  async ionViewWillEnter() {

    this.isUserSign = this.authService.isSignIn();
    if (this.isUserSign) {
      let laodingModal;
      if(this.favService.isWishListProductsRequestAsync()) {
        laodingModal = this.showLoadingPage();
      }

      try {
        const result = await this.favService.getWishListProducts();
        this.favProducts = result;
        laodingModal? laodingModal.dismiss() : null;
        
      } catch (error) {
        console.log(error);
        laodingModal? laodingModal.dismiss() : null;
      }
      console.log(this.favProducts);
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

  public onViewItem(product: Product) {
    const modal = this.presentModal(ItemPage, product);
  }

  public moveProductToBag() {

  }

  private showLoadingPage(): Modal {
    const laodingModal = this.modalCtrl.create(LoadPage);
    laodingModal.present();
    return laodingModal;
  }

  private presentModal(Page, params?) {
    const modal = this.modalCtrl.create(Page, params);
    modal.present();
    return modal;

  }

  private goToPage(Page, params?) {
    return this.navCtrl.push(Page, params);
  }

 


}
