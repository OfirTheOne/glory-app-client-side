import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserOrdersPage } from './user-orders';

@NgModule({
  declarations: [
    UserOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(UserOrdersPage),
  ],
  exports: [
    UserOrdersPage,
  ],
})
export class UserOrdersPageModule {}
