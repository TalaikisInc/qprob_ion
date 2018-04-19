import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';
import { PostPage } from './post';

@NgModule({
  declarations: [
    PostPage,
  ],
  imports: [
    IonicPageModule.forChild(PostPage),
    ComponentsModule,
  ],
  exports: [
    PostPage
  ]
})
export class PostPageModule {}
