import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, RadioGroup, RadioButton } from 'ionic-angular';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserApiService, AgentAuthService } from '../../../services';

@IonicPage()
@Component({
  selector: 'page-user-orders',
  templateUrl: 'user-orders.html',
})
export class UserOrdersPage {
}
