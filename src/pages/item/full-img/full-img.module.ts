import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FullImgPage } from './full-img';

@NgModule({
  declarations: [
    FullImgPage,
  ],
  imports: [
    IonicPageModule.forChild(FullImgPage),
  ],
  exports: [
    FullImgPage,
  ],
})
export class FullImgPageModule {}
