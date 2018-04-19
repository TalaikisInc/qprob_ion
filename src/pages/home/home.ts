import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Post } from '../../models/post.interface';
import { Category } from '../../models/category.interface';
import { ApiProvider } from '../../providers/api/api';
import { environment } from '../../environments/environment';
import { NetworkProvider } from '../../providers/network/network';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  categorySlug: string
  posts: Post[]
  category: Category
  homeTitle: string

  constructor(private api: ApiProvider, private net: NetworkProvider, private sco: ScreenOrientation) {
    this.homeTitle = environment.homeTitle;
  }

  getCurrentScreen() {
    console.log(this.sco.type);
  }

  unlockScreen() {
    this.sco.unlock();
  }

  async lockScreen() {
    try {
      this.sco.lock(this.sco.ORIENTATIONS.LANDSCAPE);
    }
    catch (error) {
      console.log(error);
    }
  }

  observeScreen() {
    this.sco.onChange()
      .subscribe(() => console.log("Orientation changed."));
  }

  getPosts(): void {
    // TODO check if theer is an ineternt, else read from ddb.
    this.api.getTodayPosts().subscribe((data: Post[]) => this.posts = data);
  }

  doRefresh(refresher) {
    this.getPosts();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  ionViewWillLoad() {
    this.getPosts();
  }

  ionViewDidEnter() {
    this.net.networkWatcher();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
  }

  ionViewWillLeave() {
    this.net.connected.unsubscribe();
    this.net.disconnected.unsubscribe();
  }

}
