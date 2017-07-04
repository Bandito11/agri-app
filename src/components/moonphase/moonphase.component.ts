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
    @Input() token: string;
    /**moonphase html properties*/
    moonPhaseImage: string;
    /**Sets the moon phase from the date picked by the user*/
    moonPhaseName: string;
    /**Set the date of the next full moon*/
    fullMoon: string;

    ngOnInit() {
        this.getMoonPhase({date: this.date, token: this.token});
    }

    ngOnChanges(changes) {
        this.getMoonPhase({date: changes.date.currentValue, token: this.token});
    }

    /**Returns the current moonphase  */
    getMoonPhase(data: {date: Calendar, token:string}) {
        this.moonPhaseService
            .getMoonPhase({date: data.date, token: data.token})
            .then(api => {
                this.getPhase.emit(api.data[0].phase);
                this.moonPhaseName = api.data[0].phase;
                this.moonPhaseImage = api.data[0].icon;
                this.fullMoon = api.data[0].full;
            })
            .catch((error) => { this.moonPhaseName = 'La información no esta disponible.' });
    }
}


