import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular'
import { AdMob, AdMobOptions } from '@ionic-native/admob';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { HelpersComponent } from '../../components/helpers/helpers.component';

@Injectable()
export class AdsProvider {

  private adMobId: { banner: string, interstitial: string };
  private adOptions: AdMobOptions = <AdMobOptions>{};
  //private adExtras: AdMobAdExtras = <AdMobAdExtras>{};

  constructor(private helpers: HelpersComponent, private adMob: AdMob, private platform: Platform) {
    this.platform.ready().then(() => {
      this.initAds();
    });
  }

  private initAds() {
    if (!AdMob) {
      console.log("AdMob not found.");
      if (environment.liveDebug) {
        this.helpers.alert("AdMob Debug", "AdMob not found.");
      }
      return;
    }
    this.setAdMobIds();
    this.setAdMobOptions();
    this.registerAdMobEvents();
  }

  private setAdMobIds() {
    if (this.platform.is('android')) {
      this.adMobId = {
        banner: environment.adMobIdAndroidBanner,
        interstitial: environment.adMobIdAndroidInterstitial
      }
    }
    else if (this.platform.is('ios')) {
      this.adMobId = {
        banner: environment.adMobIdiOSBanner,
        interstitial: environment.adMobIdiOSInterstitial
      }
    }
  }

  private setAdMobOptions() {
    this.adOptions = {
      position: this.adMob.AD_POSITION.BOTTOM_CENTER,
      isTesting: environment.adsIsTesting,
      autoShow: true,
      //adExtras: this.adExtras
    }

    this.adMob.setOptions(this.adOptions)
  }

  private registerAdMobEvents() {
    document.addEventListener('onAdFailLoad', data => console.log(JSON.stringify(data)));
    document.addEventListener('onAdLoaded', data => console.log(JSON.stringify(data)));
    document.addEventListener('onAdPresent', data => console.log(JSON.stringify(data)));
    document.addEventListener('onAdDismiss', data => console.log(JSON.stringify(data)));
    document.addEventListener('onAdLeaveApp', data => console.log(JSON.stringify(data)));
  }

  public showBanner() {
    if (!this.adMob) return false;
    try {
      this.adMob.createBanner({ adId: this.adMobId.banner });
    }
    catch (e) {
      console.log(e);
      if (environment.liveDebug) {
        this.helpers.alert("AdMob Debug", e);
      }
    }
    return true;
  }

  public showInterstitial() {
    if (!this.adMob) return false;
    this.adMob.prepareInterstitial({ adId: this.adMobId.interstitial });
    return true;
  }

  public removeAds() {
    if (this.adMob) this.adMob.removeBanner();
  }

}
