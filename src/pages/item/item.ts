import { Component, ViewChild } from '@angular/core';
import { 
  IonicPage, 
  NavParams, 
  AlertController, 
  ModalController, 
  Select, 
  ViewController
} from 'ionic-angular';

import { FullImgPage } from './full-img/full-img';

import { AgentAuthService } from './../../services/auth/agent-auth.service';
import { FavService } from './../../services/local-services/fav.service';
import { CartService } from './../../services/local-services/cart.service';

import { Product } from './../../models/store-models/product.interface';
import { CartProduct } from './../../models/store-models/cart-product.interface';

/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  @ViewChild('selectSize') selectSize: Select;
  product: Product;
  isUserSign: boolean = false;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,

    private authService: AgentAuthService,
    private favService: FavService,
    private cartService: CartService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPage');
    this.isUserSign = this.authService.isSignIn();
    this.product = this.navParams.data;
  }
  
  // remove or add depending on the wish state
  public async toggleWishState(): Promise<void> {
    if (this.isUserSign) {
      const wishState = this.isWish();
      try {
        if (wishState) {     
          await this.favService.removeProductFromWish(this.product)
        } else {
          await this.favService.addProductToWish(this.product)
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  public isWish(): boolean {
    if (this.isUserSign) {
      return this.favService.isWish(this.product._id);
    }
    return false;
  }

  public addItemToCart() {
    if (this.isUserSign) {
      const selectedSize = this.selectSize._text;
      console.log(selectedSize);
      if (selectedSize === '') {
        this.presentSelectSizeError();
      } else {
        this.presentConfirmAddItemToCart(this.product, selectedSize);
      }
    }
  }

  public onShareButtonClicked(socialNetwork: string) {
    console.log("share on " + socialNetwork);
  }

  private presentSelectSizeError() {
    let alert = this.alertCtrl.create({
      title: 'Error adding item',
      message: 'Please select a size',
      buttons: [{ text: 'Ok', role: 'cancel' }]
    });
    alert.present();
  }

  private presentConfirmAddItemToCart(product: Product, size: string) {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want to add this item to your cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: () => {
            let cartProduct: CartProduct = {product, size}
            this.cartService.addProductToCart(cartProduct);
            console.log('Add clicked');
          }
        }
      ]
    });
    alert.present();
  }

  public goToFullImg(imageIndex: number) {
    const imgModel = this.modalCtrl.create(FullImgPage, {
      imgSrc: this.product.imagePath[imageIndex]
    });
    imgModel.present();
  }
  
  public onExit() {
    this.viewCtrl.dismiss();
  }

}
