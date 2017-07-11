import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Calendar } from './../../types';
import { MoonPhaseProvider } from './../../providers/moonphase.provider';

@Component({
    selector: 'moon-phase-component',
    templateUrl: 'moonphase.component.html'
})
export class MoonPhaseComponent implements OnChanges {

    constructor(private moonPhaseProvider: MoonPhaseProvider) { }

    @Input() date: Calendar;
    @Input() token: string;
    @Output() getPhase = new EventEmitter();

    /**
     * html properties
     * 
     * @private
     * @type {string}
     * @memberof MoonPhaseComponent
     */
    private moonPhaseImage: string;
    /**
     * html properties
     * 
     * @private
     * @type {string}
     * @memberof MoonPhaseComponent
     */
    private moonPhaseName: string;
    /**
     * html properties
     * 
     * @private
     * @type {string}
     * @memberof MoonPhaseComponent
     */
    private fullMoon: string;
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
                this.getMoonPhase({ date: this.tempDate, token: this.tempToken });
            } catch (error) {
                console.error(error);
            }
        }
    }

    /**Returns the current moonphase  */
    async getMoonPhase(data: { date: Calendar, token: string }) {
        try {
            const response = await this.moonPhaseProvider.getMoonPhase({ date: data.date, token: data.token });
            if (response.success == true) {
                this.getPhase.emit(response.data.phase);
                this.moonPhaseName = response.data.phase;
                this.moonPhaseImage = response.data.icon;
                this.fullMoon = response.data.full;
            }
        } catch (error) {
            console.error(error);
            this.moonPhaseName = 'No se pudo recopilar la data en estos instantes';
        }
    }

}


