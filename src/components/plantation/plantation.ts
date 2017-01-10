import { Component, OnInit } from '@angular/core';

/*
  Generated class for the Plantation component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
    selector: 'plantation-component',
    templateUrl: 'plantation.html'
})
export class PlantationComponent implements OnInit {

    constructor() { }

    //plants list
    plantation: string[];

    ngOnInit() {
        this.plantation = plantation;
    }
}

///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
/// Only used for test purposes. It will be deleted./////
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
export let plantation = [
    'Berenjena',
    'Cebollas'
]