import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentPage } from './payment';


@NgModule({
  declarations: [
    // StripePaymentFormComponent,
    PaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentPage),
  ],
  exports: [
    PaymentPage,
  ],
})
export class PaymentPageModule {}
