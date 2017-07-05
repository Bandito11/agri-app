import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Calendar } from './../../types';
import { MoonPhaseProvider } from './../../providers/moonphase.provider';

@Component({
    selector: 'moon-phase-component',
    templateUrl: 'moonphase.component.html'
})
export class MoonPhaseComponent implements OnInit, OnChanges {

    constructor(private moonPhaseService: MoonPhaseProvider) { }

    @Input() date: Calendar;
    @Input() token: string;
    @Output() getPhase = new EventEmitter();

    /**moonphase html properties*/
    private moonPhaseImage: string;
    /**Sets the moon phase from the date picked by the user*/
    private moonPhaseName: string;
    /**Set the date of the next full moon*/
    private fullMoon: string;

    ngOnInit() {
        this.getMoonPhase({ date: this.date, token: this.token });
    }

    ngOnChanges(changes) {
        try {
            this.getMoonPhase({ date: changes.date.currentValue, token: changes.token.currentValue });
        } catch (error) {
            console.error(error)
        }
    }

    /**Returns the current moonphase  */
    async getMoonPhase(data: { date: Calendar, token: string }) {
        try {
            const response = await this.moonPhaseService.getMoonPhase({ date: data.date, token: data.token });
            this.getPhase.emit(response.data[0].phase);
            this.moonPhaseName = response.data[0].phase;
            this.moonPhaseImage = response.data[0].icon;
            this.fullMoon = response.data[0].full;
        } catch (error) {
            this.moonPhaseName = error;
        }
    }
}


