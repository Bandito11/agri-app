import { iCalendar } from './../types';

export class CalendarModel implements iCalendar {
    weekDay: number;
    day: number;
    month: number;
    year: number;
    constructor(day: number,
        month: number,
        year: number) {
        this.weekDay = -1;
        this.day = day;
        this.month = month;
        this.year = year;
    }
}