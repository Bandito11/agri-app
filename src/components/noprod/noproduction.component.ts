import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class NoprodComponent implements OnChanges {
    @Input() date: Calendar;
    @Input() token: string;

    /**
     * List of crops
     * 
     * @private
     * @type {Crop[]}
     * @memberof CropsComponent
     */
    private crops: Crop[] = [];
    /**
     * 
     * 
     * @private
     * @type {string}
     * @memberof CropsComponent
     */
    private errorMessage: string;
    /**
     * 
     * 
     * @private
     * @memberof CropsComponent
     */
    private mode = 'noproduction';
    /**
    * Temporary date to be used on ngOnChanges
    * 
    * @private
    * @type {Calendar}
    * @memberof MoonPhaseComponent
    */
    private tempDate: Calendar;
    /**
     * Temporary token to be used on ngOnChanges
     * 
     * @private
     * @type {string}
     * @memberof MoonPhaseComponent
     */
    private tempToken: string;

    constructor(private cropService: CropProvider) { }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            if (propName == 'date') {
                this.tempDate = changes[propName].currentValue;
            }
            if (propName == 'token') {
                this.tempToken = changes[propName].currentValue;
            }
        }
        if (this.tempDate && this.tempToken) {
            try {
                this.getCrops({ month: this.tempDate.month, token: this.tempToken });
            } catch (error) {
                console.error(error);
            }
        }
    }

    /**Returns the current crops  */
    getCrops(data: { month: number, token: string }) {
        this.cropService.getCropsByMonth({ month: data.month, mode: this.mode, token: data.token })
            .subscribe(api => {
                try {
                    this.crops = api.data;
                } catch (error) {
                    this.errorMessage = api.error;
                }
            },
            msg => this.errorMessage = msg.error);
    }

}