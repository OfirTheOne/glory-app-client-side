import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemsGridPage } from './items-grid';

@NgModule({
  declarations: [
    ItemsGridPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemsGridPage),
  ],
  exports: [
    ItemsGridPage,
  ],
})
export class ItemsGridPageModule {}
