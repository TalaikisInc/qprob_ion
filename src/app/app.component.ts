import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AdsProvider } from '../providers/ads/ads';
import { environment } from '../environments/environment';

@Component({
  templateUrl: 'app.html'
})
export class QProb {
  @ViewChild(Nav) nav: Nav;
  rootPage: string = 'HomePage';
  pages: Array<{title: string, component: string, icon: string}>;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private ads: AdsProvider) {
    this.initializeApp();
    
    if (environment.production) {
      this.showAds();
    }

    this.pages = [
      { title: 'Today', component: 'HomePage', icon: 'fa-newspaper-o'},
      { title: 'Authors', component: 'CatPage', icon: 'fa-tags'},
      { title: 'About', component: 'AboutPage', icon: 'fa-info'}
    ];

  }

  showAds() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.ads.showBanner();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

}
