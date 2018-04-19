import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  categorySlug: string

  constructor(private navCtrl: NavController) {
  }

  getMockPosts(): void {
    this.navCtrl.push('ResultsPage', {
      categorySlug: this.categorySlug
    })
  }

  getPosts(): void {
    this.navCtrl.push('ResultsPage', {
      categorySlug: this.categorySlug
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
