import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { iCalendar } from './../../models';
import { weekDaysHeader, weekDaysLabels, monthsLabels } from './../..//labels'
/*
  TODO:
*/
@Component({
  selector: 'calendar-component',
  templateUrl: 'calendar.html'
})
export class CalendarComponent implements OnInit {

  constructor(public alertCtrl: AlertController) { }

  //weather html properties
  weekDaysHeader: string[];
  weekDaysLabels: string[];
  monthsLabels: string[];

  //Used to get the month and year to start the calendar
  month: number;
  year: number;

  //Date chosen by the user to be shown in the card Header
  @Output() getDate = new EventEmitter();

  //Used to generate Calendar 
  calendarDays: iCalendar[] = [];
  currentDate = new Date();

  ngOnInit() {
    this.createCalendar(null, null);
    this.initialize();
  }

  //Initialize Labels and headers in order to generate the calendar and the output for the header
  private initialize() {
    this.weekDaysLabels = weekDaysLabels;
    this.monthsLabels = monthsLabels;
    this.weekDaysHeader = weekDaysHeader;
    this.choseDay(
      {
        weekDay: this.currentDate.getDay(),
        day: this.currentDate.getDate(),
        year: this.currentDate.getFullYear(),
        month: this.currentDate.getMonth()
      });
  }

  //When the day is chosen, load the data from the db using the date as
  //a parameter. 
  private choseDay(date: iCalendar) {
    this.getDate.emit(date);
  }

  //Create the calendar by passing the month and the year. When starting the app the null values 
  //will be passed for the month and year parameters, but when changing to a previous month or one 
  //next in the list a month and year will be passed. 
  private createCalendar(month, year) {
    //Month max day in the calendar. 
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.calendarDays = [];
    this.month = (isNaN(month) || month == null) ? this.currentDate.getMonth() : month;
    this.year = (isNaN(year) || year == null) ? this.currentDate.getFullYear() : year;
    let firstDay = new Date(this.year, this.month, 1);
    let startingDay = firstDay.getDay();
    let monthsLength = daysInMonth[this.month];
    if (this.month == 1) {//Only February Leap Years
      if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0) {
        monthsLength = 29;
      }
    }
    for (let i = 1 - startingDay; i <= monthsLength; i++) {
      if (i > 0) {
        this.calendarDays.push(
          {
            weekDay: new Date(this.year, this.month, i).getDay(),
            day: i,
            month: this.month,
            year: this.year
          }
        );
      } else {
        this.calendarDays.push({ weekDay: null, day: null, month: null, year: null });
      }
    }
  }

  nextMonth() {
    if (this.month != 11) {
      this.createCalendar(this.month + 1, this.year);
    } else {
      this.month = 0;
      this.createCalendar(this.month, this.year + 1);
    }
  }

  previousMonth() {
    if (this.month <= this.currentDate.getMonth()
      && this.year == this.currentDate.getFullYear()) {
      this.showAlert('Error', 'No puedes ver fechas que ya han pasado.', 'OK')
    } else if (this.month != 0) {
      this.createCalendar(this.month - 1, this.year);
    } else {
      this.month = 11;
      this.createCalendar(this.month, this.year - 1);
    }
  }

  private showAlert(title: string, subTitle: string, buttons: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [buttons]
    });
    alert.present();
  }
}
