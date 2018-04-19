import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PostByCatPage } from './post-by-cat';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PostByCatPage,
  ],
  imports: [
    IonicPageModule.forChild(PostByCatPage),
    ComponentsModule,
  ],
  exports: [
    PostByCatPage
  ]
})
export class PostByCatPageModule {}
