import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentMethodsPage } from './payment-methods';
import { StripePaymentFormComponent } from '../../../components/stripe-payment-form/stripe-payment-form.component';
@NgModule({
  declarations: [
    PaymentMethodsPage,
    StripePaymentFormComponent
  ],
  imports: [
    IonicPageModule.forChild(PaymentMethodsPage),
  ],
  exports: [
    StripePaymentFormComponent,
    PaymentMethodsPage,
  ],
})
export class PaymentMethodsPageModule {}
