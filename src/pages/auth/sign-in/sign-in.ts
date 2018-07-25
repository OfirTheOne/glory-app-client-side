import { Component } from '@angular/core';
import { 
  IonicPage, NavController, NavParams, ViewController, ModalController, Modal 
} from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { LoadPage } from './../../load/load';

import { AgentAuthService } from './../../../services/auth/agent-auth.service';
import { Provider } from './../../../models/provider.enum';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  // provider: Provider;
  constructor(
    public authService: AgentAuthService,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl: ViewController,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad SignInPage');
    console.log(Provider);
  }

  async onSignIn(form: NgForm) {
    console.log(form);
    const email: string = (form.value["email"]).toLowerCase();
    const password: string = form.value["password"];

  }

  onExit(exitValue: boolean) {
    this.viewCtrl.dismiss({ signIn: exitValue });
  }

  async socialSignIn() {
    const laodingModal = this.showLoadingPage();
    try {
      const result = await this.authService.onSignIn(Provider.GOOGLE_PROVIDER);
      console.log(result);
      laodingModal.dismiss();
      this.onExit(true);
    } catch (error) {
      console.log(error);
      laodingModal.dismiss();
    }
  }

  private showLoadingPage(): Modal {
    const laodingModal = this.modalCtrl.create(LoadPage);
    laodingModal.present();
    return laodingModal;
  }


}
