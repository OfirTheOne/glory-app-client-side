import { TabNavService } from './../../services/tab-nav.service';

import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';

import { EnvironmentService } from '../../services/environment/environment.service';
import { FavPage } from '../fav/fav';
import { BagPage } from '../bag/bag';
import { StoreViewbyPage } from '../store/store-viewby/store-viewby';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root = FavPage;
  tab2Root = BagPage;
  tab3Root = StoreViewbyPage;
  tab4Root = AccountPage;

  constructor(env: EnvironmentService, private tabService: TabNavService) {
    console.log(`on ${env.isProd()? 'prod' : 'dev'} mode.`);
    this.tabService.subscribeOnSetSelectedTab(() => {
      const StoreViewbyPageIndex = 2;
      this.tabRef.select(StoreViewbyPageIndex);
    })
  }
}
