import { Component } from '@angular/core';
import { Platform, AlertController, Alert } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { AgentAuthService, SignDeclaretionManeger } from './../services/auth/agent-auth.service';
import { FavService } from './../services/local-services/fav.service';
import { CartService } from './../services/local-services/cart.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  constructor(
    platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private alertCtrl: AlertController,
    authService: AgentAuthService,
    favService: FavService,
    cartService: CartService
  ) {
    const sdm = new SignDeclaretionManeger()
    let alert: Alert;
    if(sdm.isDeclared()) {
      alert = this.presentLoadAlert();
    }
    authService.signInInitStatus.subscribe((signStatus) => {
      if(signStatus) {
        favService.getWishListProducts();
        cartService.getCartProducts();
      } else {
        console.log('user sign in failed.');
      }
      if(alert) {
        alert.dismiss(); 
        alert = undefined;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }

  
  // confirm load alert / popup while tring to sign the user.
  private presentLoadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Signing you in ..',
      message: 'Please wait while we load you in the system.',
      enableBackdropDismiss: false
    });
    alert.present()
    return alert;
  }

  
}
