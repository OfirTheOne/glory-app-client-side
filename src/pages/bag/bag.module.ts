import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BagPage } from './bag';

@NgModule({
  declarations: [
    BagPage,
  ],
  imports: [
    IonicPageModule.forChild(BagPage),
  ],
})
export class BagPageModule {}
