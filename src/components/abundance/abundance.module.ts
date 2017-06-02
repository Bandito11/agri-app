import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbundanceComponent } from './abundance';

@NgModule({
  declarations: [
    AbundanceComponent,
  ],
  imports: [
    IonicPageModule.forChild(AbundanceComponent),
  ],
  exports: [
    AbundanceComponent
  ]
})
export class AbundanceComponentModule {}
