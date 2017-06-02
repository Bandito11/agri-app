import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoprodComponent } from './noprod';

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
