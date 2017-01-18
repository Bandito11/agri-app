import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { iCalendar } from './../../models';
import { weekDaysHeader, monthsLabels } from './../../labels'
/*
  Generated class for the Calendario page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  constructor(private navCtrl: NavController) { 
     this.weekDaysHeader = weekDaysHeader;
  }

  /** weekDaysHeader html properties*/
  weekDaysHeader: string[];
  /** currentMonth html properties*/
  currentMonth: string;
  /** currentDay html properties*/
  currentDay: number;
  /** currentYear html properties*/
  currentYear: number;
  /** currentWeekDay html properties*/
  currentWeekDay: string;
  /** date html properties*/
  date: iCalendar;
  /** zodiacImage html properties*/
  zodiacImage: string;

/**Get the current date */
  getDate(date: iCalendar) {
    this.date = date;
    this.currentDay = date.day;
    this.currentMonth = monthsLabels[date.month];
    this.currentYear = date.year;
    this.currentWeekDay = this.weekDaysHeader[date.weekDay];
    this.setZodiac(date);
  }

/** Set the image string for the zodiac*/
  setZodiac(date: iCalendar) {
    switch (date.month) {
      case 0:
        if (date.day >= 20 && date.day <= 31) {
          this.zodiacImage = "zodiac-aquarius-zodiac-sign-symbol-1";
        } else {
          this.zodiacImage = "zodiac-capricorn-2";
        }
        break;
      case 1:
        if (date.day >= 19 && date.day <= 29) {
          this.zodiacImage = "zodiac-pisces";
        } else {
          this.zodiacImage = "zodiac-aquarius-zodiac-sign-symbol-1";
        }
        break;
      case 2:
        if (date.day >= 21 && date.day <= 31) {
          this.zodiacImage = "zodiac-aries-zodiac-sign-symbol";
        } else {
          this.zodiacImage = "zodiac-pisces";
        }
        break;
      case 3:
        if (date.day >= 20 && date.day <= 31) {
          this.zodiacImage = "zodiac-taurus-zodiac-symbol-of-bull-head-front";
        } else {
          this.zodiacImage = "zodiac-aries-zodiac-sign-symbol";
        }
        break;
      case 4:
        if (date.day >= 21 && date.day <= 31) {
          this.zodiacImage = "zodiac-gemini-sign-of-zodiac";
        } else {
          this.zodiacImage = "zodiac-taurus-zodiac-symbol-of-bull-head-front";
        }
        break;
      case 5:
        if (date.day >= 21 && date.day <= 31) {
          this.zodiacImage = "zodiac-crab-symbol-for-zodiac-cancer-sign";
        } else {
          this.zodiacImage = "zodiac-gemini-sign-of-zodiac";
        }
        break;
      case 6:
        if (date.day >= 23 && date.day <= 31) {
          this.zodiacImage = "zodiac-leo-lion-head-side";
        } else {
          this.zodiacImage = "zodiac-crab-symbol-for-zodiac-cancer-sign";
        }
        break;
      case 7:
        if (date.day >= 23 && date.day <= 31) {
          this.zodiacImage = "zodiac-virgo-woman-head-shape-symbol";
        } else {
          this.zodiacImage = "zodiac-leo-lion-head-side";
        }
        break;
      case 8:
        if (date.day >= 23 && date.day <= 31) {
          this.zodiacImage = "zodiac-libra-balanced-scale-symbol";
        } else {
          this.zodiacImage = "zodiac-virgo-woman-head-shape-symbol";
        }
        break;
      case 9:
        if (date.day >= 23 && date.day <= 31) {
          this.zodiacImage = "zodiac-scorpion-shape";
        } else {
          this.zodiacImage = "zodiac-libra-balanced-scale-symbol";
        }
        break;
      case 10:
        if (date.day >= 22 && date.day <= 31) {
          this.zodiacImage = "zodiac-sagittarius-sign";
        } else {
          this.zodiacImage = "zodiac-scorpion-shape";
        }
        break;
      case 11:
        if (date.day >= 22 && date.day <= 31) {
          this.zodiacImage = "zodiac-capricorn-2";
        } else {
          this.zodiacImage = "zodiac-sagittarius-sign";
        }
        break;
      default:
        this.zodiacImage = "#";
    }
  }
}
