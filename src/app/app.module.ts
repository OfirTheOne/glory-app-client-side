import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// components
import { MyApp } from './app.component';

// pages
import { 
  pagesArray,
  pagesModuleArray,
   } from '../pages';
import { TabsPage } from '../pages/tabs/tabs';

// ****** services
import { servicesArray } from '../services';



@NgModule({
  declarations: [
    TabsPage,
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    
    ...pagesModuleArray,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ...pagesArray,
    TabsPage,
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ...servicesArray,
  ]
})
export class AppModule {}
