import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// components
import { MyApp } from './app.component';
import { componentsArray, StripePaymentFormComponent } from '../components';
import { directivesArray } from '../directives';

// pages
import { pagesArray } from '../pages';
import { TabsPage } from '../pages/tabs/tabs';

// ****** services
import { servicesArray } from '../services';



@NgModule({
  declarations: [
    TabsPage,
    MyApp,
    ...directivesArray,
    ...componentsArray,
    ...pagesArray,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ...pagesArray,
    MyApp,
    StripePaymentFormComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ...servicesArray,
  ]
})
export class AppModule {}
