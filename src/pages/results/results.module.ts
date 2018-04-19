import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';
import { ResultsPage } from './results';

@NgModule({
  declarations: [
    ResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultsPage),
    ComponentsModule,
  ],
  exports: [
    ResultsPage,
  ]
})
export class ResultsPageModule {}
