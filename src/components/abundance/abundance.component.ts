import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CropProvider } from './../../providers/crops.provider';
import { Calendar, Crop } from './../../types';
/**
 * Generated class for the AbundanceComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'abundance-component',
  templateUrl: 'abundance.component.html'
})
export class AbundanceComponent implements OnInit, OnChanges{
  @Input() date: Calendar;

  /**List of crops */
  crops: Crop[];
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
    this.cropService.getCropsByMonth({ month: month, mode: 'abundantcrops' })
      .subscribe(api => {
        //TODO: Make three arrays for abundantCrops, noProductionCrops and for beginOrProductionCrops 
        for (let i = 0; i < api.data.length; i++) {
          this.crops[i] = api[i];
        }
      },
      error => this.errorMessage = error);
  }
}
