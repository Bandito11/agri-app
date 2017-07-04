import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipsComponent } from './tips.component';

@NgModule({
  declarations: [
    TipsComponent,
  ],
  imports: [
    IonicPageModule.forChild(TipsComponent),
  ],
  exports: [
    TipsComponent
  ]
})
export class TipsComponentModule {}
