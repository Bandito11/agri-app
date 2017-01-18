import { Component } from '@angular/core';

import { MainPage } from '../main/main';
import { ForoPage } from '../foro/foro';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  main: any = MainPage;
  forum: any = ForoPage;

  constructor() {

  }
}
