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
})
export class ItemsGridPageModule {}
