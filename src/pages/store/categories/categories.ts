import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemsGridPage } from '../items-grid/items-grid';
import { categories } from '../../../data/category.data';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  view;
  categoriesList = categories;
   
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
    this.view = this.navParams.data;
    console.log(this.view, this.categoriesList);
  }

  goToPage(params) {
    this.navCtrl.push(ItemsGridPage, params);
  }



}
