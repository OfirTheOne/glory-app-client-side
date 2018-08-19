import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreViewbyPage } from './store-viewby';

@NgModule({
  declarations: [
    StoreViewbyPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreViewbyPage),
  ],
  exports: [
    StoreViewbyPage,
  ],
})
export class StoreViewbyPageModule {}
