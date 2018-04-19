import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { Post } from '../../models/post.interface';
import { Category } from '../../models/category.interface';
import { environment } from '../../environments/environment';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  postSlug: string
  categorySlug: string
  homeTitle: string
  posts: Post[]
  category: Category

  constructor(private api: ApiProvider, private navCtrl: NavController, private navParams: NavParams) {
    this.homeTitle = environment.homeTitle;
  }

  getPost(): void {
    // TODO check if theer is an internet, else read from ddb.
    this.api.getCategory(this.categorySlug).subscribe((data: Category) => this.category = data);
    this.api.getPost(this.postSlug).subscribe((data: Post[]) => this.posts = data);
  }

  goBack() {
    this.navCtrl.pop();
  }

  ionViewWillLoad() {
    this.postSlug = this.navParams.get('postSlug');
    this.categorySlug = this.navParams.get('categorySlug');

    if (this.postSlug) {
      this.getPost();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }

}
