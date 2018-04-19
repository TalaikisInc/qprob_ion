import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

//import { environment } from '../../environments/environment';
import { Post } from '../../models/post.interface';
import { Category } from '../../models/category.interface';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  categorySlug: string
  posts: Post[]
  category: Category

  constructor(private api: ApiProvider, private navParams: NavParams) {
  }

  getPosts(): void {
    this.api.getCategory(this.categorySlug).subscribe((data: Category) => this.category = data);
    this.api.getPostsByCategory(this.categorySlug).subscribe((data: Post[]) => this.posts = data);

    //this.api.mockGetCategory(this.categoryTitle).subscribe((data: Category) => this.category = data);
    //this.api.mockGetPost(this.categoryTitle).subscribe((data: Post[]) => this.posts = data);
  }

  ionViewWillLoad() {
    this.categorySlug = this.navParams.get('categorySlug');
    if (this.categorySlug) {
      this.getPosts();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
  }

}
