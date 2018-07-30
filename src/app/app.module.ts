import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// pages modules
import { SignUpPageModule } from './../pages/auth/sign-up/sign-up.module';
import { SignInPageModule } from './../pages/auth/sign-in/sign-in.module';
import { FullImgPageModule } from './../pages/item/full-img/full-img.module';
import { LoadPageModule } from './../pages/load/load.module';

import { ItemPageModule } from './../pages/item/item.module';
import { ItemsGridPageModule } from './../pages/store/items-grid/items-grid.module';
import { CategoriesPageModule } from './../pages/store/categories/categories.module';
import { StoreViewbyPageModule } from './../pages/store/store-viewby/store-viewby.module';
import { UserAddressPageModule } from './../pages/account/user-address/user-address.module';
import { UserDetailsPageModule } from './../pages/account/user-details/user-details.module';
import { AccountPageModule } from './../pages/account/account.module';
import { FavPageModule } from './../pages/fav/fav.module';
import { PurchasePageModule } from './../pages/bag/purchase/purchase.module';
import { BagPageModule } from './../pages/bag/bag.module';

// ionic pages
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

// pages
import { LoadPage } from './../pages/load/load';
import { SignUpPage } from './../pages/auth/sign-up/sign-up';
import { SignInPage } from './../pages/auth/sign-in/sign-in';

import { FullImgPage } from './../pages/item/full-img/full-img';
import { ItemPage } from './../pages/item/item';
import { ItemsGridPage } from './../pages/store/items-grid/items-grid';
import { CategoriesPage } from './../pages/store/categories/categories';
import { StoreViewbyPage } from './../pages/store/store-viewby/store-viewby';

import { FavPage } from './../pages/fav/fav';

import { PurchasePage } from './../pages/bag/purchase/purchase';
import { BagPage } from './../pages/bag/bag';

import { UserAddressPage } from './../pages/account/user-address/user-address';
import { UserDetailsPage } from '../pages/account/user-details/user-details';
import { AccountPage } from './../pages/account/account';

// ****** services
// core services
import { EnvironmentService } from '../services/environment/environment.service';
import { TabNavService } from '../services/tab-nav.service';
import { HttpService } from '../services/api-services/http.service';

// api services
import { UserApiService } from '../services/api-services/user-api/user-api.service';
import { CartApiService } from './../services/api-services/cart-api.service';
import { FavApiService } from './../services/api-services/fav-api.service';
import { ProductApiService } from './../services/api-services/product-api.service';

// auth services
import { AgentAuthService } from '../services/auth/agent-auth.service';
import { CustomAuthStrategyService } from '../services/auth/custom-auth/custom-auth.service';
import { FacebookAuthStrategyService } from '../services/auth/facebook-auth/facebook-auth.service';
import { GoogleAuthStrategyService } from '../services/auth/google-auth/google-auth.service';

// local data services
import { ProductService } from './../services/local-services/product.service';
import { FavService } from '../services/local-services/fav.service';
import { CartService } from './../services/local-services/cart.service';
// import { DevCartService } from './../services/local-services/dev-cart.service';


@NgModule({
  declarations: [
    TabsPage,
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    
    FullImgPageModule,
    LoadPageModule,
    SignInPageModule,
    SignUpPageModule,
    ItemPageModule,

    ItemsGridPageModule,
    CategoriesPageModule,
    PurchasePageModule,
    
    StoreViewbyPageModule,
    BagPageModule,
    FavPageModule,
    UserAddressPageModule,
    UserDetailsPageModule,
    AccountPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    UserAddressPage,
    UserDetailsPage,
    FullImgPage,
    LoadPage,
    SignInPage,
    SignUpPage,
    ItemPage,
    ItemsGridPage,
    CategoriesPage,
    PurchasePage,
    StoreViewbyPage,
    BagPage,
    FavPage,
    AccountPage,
    TabsPage,
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EnvironmentService,
    TabNavService,
    
    UserApiService,
    
    GoogleAuthStrategyService,
    FacebookAuthStrategyService,
    CustomAuthStrategyService,
    AgentAuthService,

    HttpService,
    ProductApiService,
    FavApiService,
    CartApiService,

    ProductService,
    FavService,
    CartService,
    // DevCartService,

  ]
})
export class AppModule {}
