import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import { iCalendar } from './../../types';
import { weekDaysHeader, monthsLabels } from './../../labels'
/*
  Generated class for the Calendario page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main',
  templateUrl: 'main.page.html'
})
export class MainPage implements OnInit {

  constructor(private navCtrl: NavController) {
  }

  @ViewChild(Slides) slides: Slides;

  ngOnInit(): void {
    this.slides.autoHeight = true;
    this.weekDaysHeader = weekDaysHeader;
  }
  currentDate: string;
  weekDaysHeader: string[];
  date: iCalendar;
  zodiacName: string;
  zodiacImage: string;
  phase: string;
  /**
   * 
   * 
   * @param {iCalendar} date 
   * 
   * @memberof MainPage
   */
  getDate(date: iCalendar) {
    this.date = date;
    const currentDay = date.day;
    const currentMonth = monthsLabels[date.month];
    const currentYear = date.year;
    const currentWeekDay = this.weekDaysHeader[date.weekDay];
    this.currentDate = `${currentWeekDay} ${currentDay} de ${currentMonth} de ${currentYear}`;
    this.setZodiac(date);
  }

  getPhase(phase: string) {
    this.phase = phase;
  }

  /** Set the image string for the zodiac*/
  setZodiac(date: iCalendar) {
    switch (date.month) {
      case 0:
        if (date.day >= 20 && date.day <= 31) {
          this.zodiacName = "Aquarius";
          this.zodiacImage = "zodiac-aquarius-zodiac-sign-symbol-1";
        } else {
          this.zodiacName = "Capricorn";
          this.zodiacImage = "zodiac-capricorn-2";
        }
        break;
      case 1:
        if (date.day >= 19 && date.day <= 29) {
          this.zodiacName = "Pisces";
          this.zodiacImage = "zodiac-pisces";
        } else {
          this.zodiacName = "Aquarius";
          this.zodiacImage = "zodiac-aquarius-zodiac-sign-symbol-1";
        }
        break;
      case 2:
        if (date.day >= 21 && date.day <= 31) {
          this.zodiacName = "Aries";
          this.zodiacImage = "zodiac-aries-zodiac-sign-symbol";
        } else {
          this.zodiacName = "Pisces";
          this.zodiacImage = "zodiac-pisces";
        }
        break;
      case 3:
        if (date.day >= 20 && date.day <= 31) {
          this.zodiacName = "Taurus";
          this.zodiacImage = "zodiac-taurus-zodiac-symbol-of-bull-head-front";
        } else {
          this.zodiacName = "Aries";
          this.zodiacImage = "zodiac-aries-zodiac-sign-symbol";
        }
        break;
      case 4:
        if (date.day >= 21 && date.day <= 31) {
          this.zodiacName = "Gemini";
          this.zodiacImage = "zodiac-gemini-sign-of-zodiac";
        } else {
          this.zodiacName = "Taurus";
          this.zodiacImage = "zodiac-taurus-zodiac-symbol-of-bull-head-front";
        }
        break;
      case 5:
        if (date.day >= 21 && date.day <= 31) {
          this.zodiacName = "Cancer";
          this.zodiacImage = "zodiac-crab-symbol-for-zodiac-cancer-sign";
        } else {
          this.zodiacName = "Gemini";
          this.zodiacImage = "zodiac-gemini-sign-of-zodiac";
        }
        break;
      case 6:
        if (date.day >= 23 && date.day <= 31) {
          this.zodiacName = "Leo";
          this.zodiacImage = "zodiac-leo-lion-head-side";
        } else {
          this.zodiacName = "Cancer";
          this.zodiacImage = "zodiac-crab-symbol-for-zodiac-cancer-sign";
        }
        break;
      case 7:
        if (date.day >= 23 && date.day <= 31) {
          this.zodiacName = "Virgo";
          this.zodiacImage = "zodiac-virgo-woman-head-shape-symbol";
        } else {
          this.zodiacName = "Leo";
          this.zodiacImage = "zodiac-leo-lion-head-side";
        }
        break;
      case 8:
        if (date.day >= 23 && date.day <= 31) {
          this.zodiacName = "Libra";
          this.zodiacImage = "zodiac-libra-balanced-scale-symbol";
        } else {
          this.zodiacName = "Virgo";
          this.zodiacImage = "zodiac-virgo-woman-head-shape-symbol";
        }
        break;
      case 9:
        if (date.day >= 23 && date.day <= 31) {
          this.zodiacName = "Scorpio";
          this.zodiacImage = "zodiac-scorpion-shape";
        } else {
          this.zodiacName = "Libra";
          this.zodiacImage = "zodiac-libra-balanced-scale-symbol";
        }
        break;
      case 10:
        if (date.day >= 22 && date.day <= 31) {
          this.zodiacName = "Sagittarius";
          this.zodiacImage = "zodiac-sagittarius-sign";
        } else {
          this.zodiacName = "Scorpio";
          this.zodiacImage = "zodiac-scorpion-shape";
        }
        break;
      case 11:
        if (date.day >= 22 && date.day <= 31) {
          this.zodiacName = "Capricorn";
          this.zodiacImage = "zodiac-capricorn-2";
        } else {
          this.zodiacName = "Sagittarius";
          this.zodiacImage = "zodiac-sagittarius-sign";
        }
        break;
      default:
        this.zodiacImage = "#";
    }
  }
}
