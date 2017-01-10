import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Foro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-foro',
  templateUrl: 'foro.html'
})
export class ForoPage {

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    console.log('Hello Foro Page');
  }

}
