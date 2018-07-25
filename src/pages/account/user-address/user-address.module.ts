import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserAddressPage } from './user-address';

@NgModule({
  declarations: [
    UserAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(UserAddressPage),
  ],
})
export class UserAddressPageModule {}
