import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { iCalendar } from './../../models';
import { MoonPhaseService } from './../../providers/moonphase';

/*
    TODO:
    Give an animation for when the data is loading
*/
@Component({
    selector: 'moon-phase-component',
    templateUrl: 'moonphase.html'
})
export class MoonPhaseComponent implements OnInit, OnChanges {

    constructor(private moonPhaseService: MoonPhaseService) { }

    @Input() date: iCalendar;
    //moonphase html properties
    moonPhaseImage: string;
    //Sets the moon phase from the date picked by the user
    moonPhaseName: string;
    //Set the date of the next full moon
    fullMoon: string;

    ngOnInit() {
        this.getMoonPhaseName(this.date);
    }

    ngOnChanges(changes) {
        this.getMoonPhaseName(changes.date.currentValue);
    }

    getMoonPhaseName(date: iCalendar) {
        this.moonPhaseService
            .getMoonPhaseInfo(date)
            .then(api => {
                this.moonPhaseName = api.phase;
                this.moonPhaseImage = api.icon;
                this.fullMoon = api.full;
            })
            .catch((error) => { Promise.reject(error.message || error) });
    }
}


