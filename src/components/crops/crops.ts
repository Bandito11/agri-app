import { Component, OnInit } from '@angular/core';

/*
  Generated class for the Crops component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
    selector: 'crops-component',
    templateUrl: 'crops.html'
})
export class CropsComponent implements OnInit {

    constructor() { }

    /**List of crops */
    crops: string[];

    ngOnInit() {
        this.crops = crops;
    }
}

///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
/// Only used for test purposes. It will be deleted./////
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
export let crops = [
    'Berenjena',
    'Cebollas'
]