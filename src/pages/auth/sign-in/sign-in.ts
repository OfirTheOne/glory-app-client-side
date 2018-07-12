import { AgentAuthService } from './../../../services/auth/agent-auth.service';
import { Provider } from './../../../models/provider.enum';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  Provider: Provider;
  constructor(
    public authService: AgentAuthService,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad SignInPage');
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
    const result = await this.authService.onSignIn(Provider.GOOGLE_PROVIDER);
    console.log(result);
  }
}
