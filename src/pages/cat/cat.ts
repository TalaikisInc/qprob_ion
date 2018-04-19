import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { Category } from '../../models/category.interface';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-cat',
  templateUrl: 'cat.html',
})
export class CatPage {
  
  categories: Category[]

  constructor(private api: ApiProvider) {
  }

  getCats(): void {
    // TODO check if theer is an internet, else read from ddb.
    this.api.getCategories().subscribe((data: Category[]) => this.categories = data);
  }

  ionViewWillLoad() {
    this.getCats();
  }

}
