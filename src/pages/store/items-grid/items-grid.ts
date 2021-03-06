import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ModalController, Modal, Content, Button, NavOptions } from 'ionic-angular';

import { AgentAuthService, ProductService, FavService } from './../../../services';

import { LoadPage } from './../../load/load';
import { Product } from './../../../models/store-models/product.interface';
import { ItemPage } from '../../item/item';

/**
 * Generated class for the ItemsGridPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const SCROLL_DEPTH_PIXELS = 35;

@IonicPage()
@Component({
  selector: 'page-items-grid',
  templateUrl: 'items-grid.html',
})
export class ItemsGridPage {
  dispalyProducts: Product[] = [];
  
  view = '';
  category = '';
  
  laodingModal: Modal;
  loadedImages : number = 0;
  
  wishProductsIds: string[] = [];
  isUserSign = false;

  @ViewChild('pageContent') content: Content;
  @ViewChild('toTopBtn') toTopBtn: Button;


  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private authService: AgentAuthService,
    private favService: FavService,
    private prouctService: ProductService) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsGridPage');
    this.loadedImages = 0;
      this.laodingModal = this.showLoadingPage();
  
    this.hideTopPageBtn(); 
    await this.initProductsDisplay();
    if(this.getDisplayProductAmount() == 0) {
      this.laodingModal.dismiss();
    }
  }

  async ionViewWillEnter() {
    console.log(`ionViewWillEnter()`);
    // set auth user page actions
    this.isUserSign = this.authService.isSignIn();
    if (this.isUserSign) {
      // handle error inside wishService.getWishList()
      this.wishProductsIds = await this.favService.getWishList();
    } else {
      this.wishProductsIds  = [];
    }
  }

  private async initProductsDisplay() {
    this.category  = this.navParams.get('category');
    this.view = this.navParams.get('view');
    let sort = 'p-desc'; // defaulte sort value
    
    try {
      this.dispalyProducts = await this.prouctService.getFilteredProducts({ 
        category: this.category, 
        view: this.matchViewParamToServerTerms(this.view), 
        sort 
      });
      console.log(this.dispalyProducts);
    } catch(e) {
      console.log(e);
    }
    console.log(this.dispalyProducts);
  }

  private matchViewParamToServerTerms(view: string) {
    switch (view) {
      case 'Catalog': {
        return 'all';
      }
      case 'New In': {
        return 'newIn';
      }
      case 'On Sale': {
        return 'onSale';
      }
    }
  }

  private showLoadingPage(): Modal {
    const laodingModal = this.modalCtrl.create(LoadPage);
    laodingModal.present();
    return laodingModal;
  }


  
  public onLoadIamge() {
    console.log(`onLoadIamge()`);
    this.loadedImages++;
    if(this.isAllProductImagesLoaded()) {
      let navOp : NavOptions = {
        animate: true,
        animation: 'wp-transition',
        direction: 'front',
        duration: 1000
      }
      this.laodingModal.dismiss(navOp);
    }

  }

  private isAllProductImagesLoaded(): boolean {
    return this.loadedImages == this.dispalyProducts.length;
  }

  public getDisplayProductAmount(): number {
    return this.dispalyProducts.length;
  }

  // ********* wish management ********* //
  public async toggleWishState(product: Product) {
    if (this.isUserSign) {
      if(this.isWish(product)) {
        await this.favService.removeProductFromWish(product);
      } else {
        await this.favService.addProductToWish(product);

      }
    }
  }

  public isWish(product: Product): boolean {
    return this.favService.isWish(product._id);
  }


  // ********* view related ********* //
  public onGoToProductPage(product: Product) {
    const modal = this.modalCtrl.create(ItemPage, product);
    modal.present();

  }


 // ********* top page button ********* //
  private hideTopPageBtn() {
    this.toTopBtn.setElementStyle('display', 'none');
  }

  private showTopPageBtn() {
    this.toTopBtn.setElementStyle('display', '');
  }

  public scrollHandler(event) {
    const topOffset = event.scrollTop;
    if (topOffset < SCROLL_DEPTH_PIXELS) {
      this.hideTopPageBtn();

    } else {
      this.showTopPageBtn()
    }
  }

  public scrollToTop() {
    this.content.scrollToTop().then(() => {
      this.hideTopPageBtn();
    });
  }




}
