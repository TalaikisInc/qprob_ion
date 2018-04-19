import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { environment } from '../../environments/environment';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  host: string
  keyword: string
  subject: string
  sourceUrl: string
  creatorUrl: string
  iapOptions: string
  iapTarget: string

  constructor(private iab: InAppBrowser) {
    this.host = environment.host;
    this.keyword = environment.keyword;
    this.subject = environment.subject;
    this.creatorUrl = "https://talaikis.com";
    this.sourceUrl = "https://" + environment.host + "/" + environment.keyword + "/add/";
    this.iapOptions = environment.iapOptions;
      this.iapTarget = environment.iapTarget;
  }

  openURL(url: string) {
    this.iab.create(url, this.iapTarget, this.iapOptions);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
