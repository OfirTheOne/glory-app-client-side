
import { Component } from '@angular/core';

import { EnvironmentService } from '../../services/environment/environment.service';
import { FavPage } from '../fav/fav';
import { BagPage } from '../bag/bag';
import { StoreViewbyPage } from '../store/store-viewby/store-viewby';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FavPage;
  tab2Root = BagPage;
  tab3Root = StoreViewbyPage;
  tab4Root = AccountPage;

  constructor(env: EnvironmentService) {
    console.log(`on ${env.isProd()? 'prod' : 'dev'} mode.`);
  }
}
