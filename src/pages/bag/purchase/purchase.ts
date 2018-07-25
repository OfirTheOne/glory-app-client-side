import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html',
})
export class PurchasePage {

  @ViewChild(Slides) slides: Slides;

  constructor(
    private viewCtrl: ViewController,
    private alertCtrl: AlertController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchasePage');
    this.slides.stopAutoplay();
  }


  public goToSlide(slideIndex) {
    this.slides.slideTo(slideIndex, 500);
  }

  public goToNextSlide() {
    this.slides.slideNext(500);
  }

  public goToPrevSlide() {
    this.slides.slidePrev(500);
  }

  public onSubmitOrder() {
    const orderAlert = this.presentOrderAlert();
    orderAlert.onDidDismiss((data, role) => {
      if (role == 'cancel') {
        console.log('order checked');

      } else {
        console.log('order submited');
        this.goToNextSlide();
      }
    });
  }

  private presentOrderAlert() {
    let alert = this.alertCtrl.create({
      title: 'Place Order',
      message: 'double checked all the details ?',
      buttons: [{ text: 'Continu', role: 'continu' }, { text: 'Cancel', role: 'cancel' }]
    });
    alert.present()
    return alert;
  }

  public onExit() {
    this.viewCtrl.dismiss();
  }
}
