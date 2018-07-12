import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SignInPage } from '../auth/sign-in/sign-in';
import { SignUpPage } from '../auth/sign-up/sign-up';
import { AgentAuthService } from '../../services/auth/agent-auth.service';


@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  signInPage = SignInPage;
  signUpPage = SignUpPage;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private authService: AgentAuthService,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }
  
  isUserSignedIn(): boolean {
    return this.authService.isSignIn();
  }

  onGotoSignInPage() {
    const modal = this.modalCtrl.create(SignInPage);
    modal.present();
    modal.onDidDismiss(() => {
      console.log('...');
    });
  }

  onGotoSignUpPage() {
    const modal = this.modalCtrl.create(SignUpPage);
    modal.present();
  }

}
