import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  onSignUp(form: NgForm) {
    console.log(form);
    const email: string = (form.value["email"]).toLowerCase();
    const password: string = form.value["password"];
  }

  onExit(exitValue: boolean) {
    this.viewCtrl.dismiss({ signUp: exitValue });
  }

}
