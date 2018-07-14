import { CategoriesPage } from './../categories/categories';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { viewBy } from '../../../data/viewby.data';

/**
 * Generated class for the StoreViewbyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store-viewby',
  templateUrl: 'store-viewby.html',
})
export class StoreViewbyPage {
  categoriesPage = CategoriesPage;
  viewBy = viewBy;

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreViewbyPage');
  }

  getProducts(event) {
    console.log(event);
  }

}
