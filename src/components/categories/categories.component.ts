import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { environment } from '../../environments/environment';
import { Category } from '../../models/category.interface';

@Component({
  selector: 'categories',
  templateUrl: 'categories.component.html'
})
export class CategoriesComponent {

  @Input() category: Category
  baseUrl: string

  constructor(private navCtrl: NavController) {
    this.baseUrl = "https://" + environment.host + "/"
  }

  goPostsByCat(categorySlug: string, categoryTitle: string) {
    this.navCtrl.push('PostByCatPage', {
      "categorySlug": categorySlug,
      "categoryTitle": categoryTitle,
    })
  }

}