import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-full-img',
  templateUrl: 'full-img.html',
})
export class FullImgPage {

  imgSrc = '';
  
  constructor(
    private viewCtrl: ViewController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemViewFullImagePage');
    this.imgSrc = this.navParams.get('imgSrc');
    
  }

  public onExit() {
    this.viewCtrl.dismiss();
  }
}
