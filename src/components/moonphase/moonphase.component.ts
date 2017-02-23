import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { iCalendar } from './../../types';
import { MoonPhaseService } from './../../services/moonphase.service';
/*
    TODO:
    Give an animation for when the data is loading
*/
@Component({
    selector: 'moon-phase-component',
    templateUrl: 'moonphase.component.html'
})
export class MoonPhaseComponent implements OnInit, OnChanges {

    constructor(private moonPhaseService: MoonPhaseService) { }

    @Input() date: iCalendar;
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
    getMoonPhase(date: iCalendar) {
        this.moonPhaseService
            .getMoonPhase(date)
            .then(api => {
                this.moonPhaseName = api.phase;
                this.moonPhaseImage = api.icon;
                this.fullMoon = api.full;
            })
            .catch((error) => { Promise.reject(error.message || error) });
    }
}


