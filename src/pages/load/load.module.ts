import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoadPage } from './load';

@NgModule({
  declarations: [
    LoadPage,
  ],
  imports: [
    IonicPageModule.forChild(LoadPage),
  ],
  exports: [
    LoadPage,
  ],
})
export class LoadPageModule {}
