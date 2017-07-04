import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CropProvider } from './../../providers/crops.provider';
import { iCalendar, iCrop } from './../../types';
/**
 * Generated class for the NoprodComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'noprod-component',
  templateUrl: 'noprod.html'
})
export class NoprodComponent implements OnInit, OnChanges {
  @Input() date: iCalendar;

  /**List of crops */
  crops: iCrop[] = [];
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
        for (let i = 0; i < api.length; i++) {
          this.crops[i] = api[i];
        }
      },
      error => this.errorMessage = <any>error);
  }
}
