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
  LoadPage,
  SignUpPage,
  SignInPage,
  FullImgPage,
  ItemPage,
  ItemsGridPage,
  CategoriesPage,
  StoreViewbyPage,
  FavPage,
  PaymentPage,
  BagPage,
  UserOrdersPage,
  UserAddressPage,
  UserDetailsPage,
  PaymentMethodsPage,
  AccountPage,

  LoadPageModule,
  SignUpPageModule,
  SignInPageModule,
  FullImgPageModule,
  ItemPageModule,
  ItemsGridPageModule,
  CategoriesPageModule,
  StoreViewbyPageModule,
  FavPageModule,
  PaymentPageModule,
  BagPageModule,
  UserAddressPageModule,
  UserDetailsPageModule,
  PaymentMethodsPageModule,
  AccountPageModule,
  UserOrdersPageModule,
  
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
    // StripePaymentFormComponent
    // ...directivesArray,
    // ...componentsArray,
    // PaymentMethodsPage
    // LoadPage,
    // SignUpPage,
    // SignInPage,
    // FullImgPage,
    // ItemPage,
    // ItemsGridPage,
    // CategoriesPage,
    // StoreViewbyPage,
    // FavPage,
    // PaymentPage,
    // BagPage,
    // UserAddressPage,
    // UserDetailsPage,
    // PaymentMethodsPage,
    // AccountPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    
/*    
    PaymentPageModule,
    AccountPageModule,
    LoadPageModule,
    SignUpPageModule,
    SignInPageModule,
    ItemPageModule,
    FullImgPageModule,
    CategoriesPageModule,
    ItemsGridPageModule,
    FavPageModule,
    StoreViewbyPageModule,
    PaymentMethodsPageModule,
    UserDetailsPageModule,
    UserAddressPageModule,
    UserOrdersPageModule,
    BagPageModule,
*/
    ...pagesModuleArray,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ...pagesArray,
    /*
    LoadPage,
    SignUpPage,
    SignInPage,
    FullImgPage,
    ItemPage,

    ItemsGridPage,
    CategoriesPage,
    StoreViewbyPage,
    FavPage,
    PaymentPage,
    
    BagPage,
    UserAddressPage,
    UserDetailsPage,
    UserOrdersPage,
    PaymentMethodsPage,
    
    AccountPage,
    */
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
