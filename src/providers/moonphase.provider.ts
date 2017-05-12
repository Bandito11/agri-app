import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { iCalendar, iMoonPhase } from './../types';
import { LocationProvider } from './location.provider';
import { URL } from './../common';

import 'rxjs/add/operator/toPromise';
/*
  TODO:
  a. make it so that it returns iMoonPhase
*/
@Injectable()
export class MoonPhaseProvider {

  constructor(public http: Http, private locationProvider: LocationProvider) { }

  /**Will return the moonphase*/
  async getMoonPhase(date: iCalendar): Promise<iMoonPhase> {
    const location = await this.locationProvider.getLocation();
    const today = new Date();
    const query = '/moonphase/' + date.year + '&' + date.month + '&' + date.day + '&' + location.latitude + '&' + location.longitude + '&' + today.getHours() + '&' + today.getMinutes() + '&' + today.getSeconds();
    return this.http.get(URL + query)
      .toPromise()
      .then((response: Response) => response.json())
      .catch(err => this.handleError(err));

  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

