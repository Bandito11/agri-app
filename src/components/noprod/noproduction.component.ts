import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CropProvider } from './../../providers/crops.provider';
import { Calendar, Crop } from './../../types';
/**
 * Generated class for the NoprodComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'noproduction-component',
  templateUrl: 'noproduction.component.html'
})
export class NoprodComponent implements OnInit, OnChanges {
  @Input() date: Calendar;

  /**List of crops */
  crops: Crop[] = [];
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
    this.cropService.getCropsByMonth({ month: month, mode: 'noproduction' })
      .subscribe(api => {
        for (let i = 0; i < api.data.length; i++) {
          this.crops[i] = api[i];
        }
      },
      error => this.errorMessage = <any>error);
  }
}
