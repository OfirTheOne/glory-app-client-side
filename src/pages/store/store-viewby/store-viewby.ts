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
  selectedViewIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreViewbyPage');
  }

  ionViewWillEnter() {
    this.selectedViewIndex = undefined;
  }

  getProducts(event) {
    console.log(event);
  }

  public onViewBySelected(index, view) {
    console.log(view);
    this.selectedViewIndex = index;
    
    setTimeout(()=>{
      this.navCtrl.push(CategoriesPage, view);
    },350);
    
  }

public and(boolA, boolB) {
  console.log(this.selectedViewIndex);
  return boolA && boolB;
} 



}
