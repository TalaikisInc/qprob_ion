import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CategoriesComponent } from './categories/categories.component';
import { PostsComponent } from './posts/posts.component';
import { PushComponent } from './push/push.component';
//import { LocalPushComponent } from './local_push/local_push.component';
import { FormatDate } from '../pipes/format-date.pipe';
import { HelpersComponent } from '../components/helpers/helpers.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    PostsComponent,
    PushComponent,
    FormatDate,
    HelpersComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    CategoriesComponent,
    PostsComponent,
    PushComponent,
    FormatDate,
    HelpersComponent,
  ]
})

export class ComponentsModule {

}
