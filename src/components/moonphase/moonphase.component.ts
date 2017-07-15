import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Calendar, Coordinates } from './../../types';
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
    @Input() location: Coordinates;

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
    /**
     * Temporary coordinates to be used on ngOnChanges
     * 
     * @private
     * @type {Coordinates}
     * @memberof MoonPhaseComponent
     */
    private tempLocation: Coordinates;

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            if (propName == 'location') {
                this.tempLocation = changes[propName].currentValue;
            }
            if (propName == 'date') {
                this.tempDate = changes[propName].currentValue;
            }
            if (propName == 'token') {
                this.tempToken = changes[propName].currentValue;
            }
        }
        if (this.tempDate && this.tempToken && this.tempLocation) {
            this.getMoonPhase({
                date: this.tempDate,
                token: this.tempToken,
                location: this.tempLocation
            });
        }
    }

    /**Returns the current moonphase  */
    getMoonPhase(data: { date: Calendar, token: string, location: Coordinates }) {
        this.moonPhaseProvider.getMoonPhase({
            date: data.date,
            token: data.token,
            location: data.location
        })
            .subscribe(response => {
                try {
                    if (response.success == true) {
                        this.getPhase.emit(response.data.phase);
                        this.moonPhaseName = response.data.phase;
                        this.moonPhaseImage = response.data.icon;
                        this.fullMoon = response.data.full;
                    } else {
                        this.handleError(response.error);
                    }
                } catch (error) {
                    this.handleError(error);
                }
            }, error => this.handleError(error)
            )
    }

    handleError(error) {
        this.moonPhaseName = error;
        this.moonPhaseImage = '';
        this.fullMoon = '';
    }

}


