import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Post } from '../../models/post.interface';
import { Category } from '../../models/category.interface';
import { ApiProvider } from '../../providers/api/api';
import { environment } from '../../environments/environment';

@IonicPage()
@Component({
  selector: 'post-by-cat',
  templateUrl: 'post-by-cat.html',
})
export class PostByCatPage {

  categorySlug: string
  categoryTitle: string
  posts: Post[]
  category: Category
  homeTitle: string

  constructor(private api: ApiProvider, private navCtrl: NavController, private navParams: NavParams) {
    this.homeTitle = environment.homeTitle;
  }

  getPosts(): void {
    // TODO check if theer is an internet, else read from ddb.
    this.api.getCategory(this.categorySlug).subscribe((data: Category) => this.category = data);
    this.api.getPostsByCategory(this.categorySlug).subscribe((data: Post[]) => this.posts = data);
  }

  goBack() {
    this.navCtrl.pop();
  }

  ionViewWillLoad() {
    this.categorySlug = this.navParams.get('categorySlug');
    this.categoryTitle = this.navParams.get('categoryTitle');

    if (this.categorySlug) {
      this.getPosts();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
  }

}
