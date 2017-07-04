import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Calendar } from './../../types';
import { MoonPhaseProvider } from './../../providers/moonphase.provider';
/*
    TODO:
    Give an animation for when the data is loading
*/
@Component({
    selector: 'moon-phase-component',
    templateUrl: 'moonphase.component.html'
})
export class MoonPhaseComponent implements OnInit, OnChanges {

    constructor(private moonPhaseService: MoonPhaseProvider) { }

    @Input() date: Calendar;
    @Output() getPhase = new EventEmitter();

    /**moonphase html properties*/
    moonPhaseImage: string;
    /**Sets the moon phase from the date picked by the user*/
    moonPhaseName: string;
    /**Set the date of the next full moon*/
    fullMoon: string;

    ngOnInit() {
        this.getMoonPhase(this.date);
    }

    ngOnChanges(changes) {
        this.getMoonPhase(changes.date.currentValue);
    }

    /**Returns the current moonphase  */
    getMoonPhase(date: Calendar) {
        this.moonPhaseService
            .getMoonPhase(date)
            .then(api => {
                this.getPhase.emit(api.data[0].phase);
                this.moonPhaseName = api.data[0].phase;
                this.moonPhaseImage = api.data[0].icon;
                this.fullMoon = api.data[0].full;
            })
            .catch((error) => this.moonPhaseName = error.message || error);
    }
}


