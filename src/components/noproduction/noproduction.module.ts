import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoprodComponent } from './noproduction.component';

@NgModule({
  declarations: [
    NoprodComponent,
  ],
  imports: [
    IonicPageModule.forChild(NoprodComponent),
  ],
  exports: [
    NoprodComponent
  ]
})
export class NoprodComponentModule {}
