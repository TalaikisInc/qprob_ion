import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CatPage } from './cat';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CatPage,
  ],
  imports: [
    IonicPageModule.forChild(CatPage),
    ComponentsModule,
  ],
  exports: [
    CatPage
  ]
})
export class CatPageModule {}
