import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CropProvider } from './../../providers/crops.provider';
import { iCalendar } from './../../types';


/*
  Generated class for the Crops component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
    selector: 'crops-component',
    templateUrl: 'crops.component.html'
})
export class CropsComponent implements OnInit, OnChanges {
    @Input() date: iCalendar;

    /**List of crops */
    crops;
    errorMessage: string;

    constructor(private cropService: CropProvider) { }

    ngOnInit() {
        this.getCrops(this.date.month);
    }

    ngOnChanges(changes) {
        this.getCrops(this.date.month);
    }

    /**Returns the current crops  */
    getCrops(month: number) {
        this.crops = [];
        this.cropService.getCropsByMonth(month)
            .subscribe(api => {
                //TODO: Make three arrays for abundantCrops, noProductionCrops and for beginOrProductionCrops 
                for (let i = 0; i < api.abundantCrops.length; i++) {
                    this.crops[i] = api.abundantCrops[i];
                }
                // api.abundantCrops.forEach((crop) =>
                //     this.crops.push(crop.name)
                // );
                for (let i = 0; i < api.beginOrProductionCrops.length; i++) {
                    this.crops[i + api.abundantCrops.length] = api.beginOrProductionCrops[i];
                }
                // api.beginOrProductionCrops.forEach((crop) =>
                //     this.crops.push(crop.name)
                // );
                for (let i = 0; i < api.noProductionCrops.length; i++) {
                    this.crops[i + api.abundantCrops.length + api.beginOrProductionCrops.length] = api.noProductionCrops[i];
                }
                // api.noProductionCrops.forEach((crop) =>
                //     this.crops.push(crop.name)
                // );
            },
            error => this.errorMessage = <any>error);
    }
}
