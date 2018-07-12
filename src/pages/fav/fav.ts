import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { SignInPage } from '../auth/sign-in/sign-in';
import { SignUpPage } from '../auth/sign-up/sign-up';

import { AgentAuthService } from './../../services/auth/agent-auth.service';
import { FavService } from '../../services/local-services/fav.service';
import { Product } from '../../models/store-models/product.interface';
import { ItemPage } from '../item/item';


@IonicPage()
@Component({
  selector: 'page-fav',
  templateUrl: 'fav.html',
})
export class FavPage {
  signInPage = SignInPage;
  signUpPage = SignUpPage;
  isUserSign;

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
      try{
        const result = await this.favService.getWishListProducts();
        this.favProducts = result;
      } catch(error) {
        console.log(error);
      }
      console.log(this.favProducts);
    }
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


  isUserSignedIn(): boolean {
    return this.authService.isSignIn();
  }
  
  public onViewItem(product: Product) {
    const modal = this.modalCtrl.create(ItemPage, product);
    modal.present();
}

}
