import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { iCalendar, iMoonPhase } from './../types';
import { LocationProvider } from './location.provider';
import { url } from './../common';

import 'rxjs/add/operator/toPromise';
/*
  TODO:
*/
@Injectable()
export class MoonPhaseProvider {

  constructor(public http: Http, private locationProvider: LocationProvider) { }

  /**Will return the moonphase*/
  getMoonPhase(date: iCalendar): Promise<iMoonPhase> {
    return this.locationProvider.getLocation().then(location => {
      let query = '/moonphase/' + date.year + '&' + date.month + '&' + date.day + '&' + location.latitude + '&' + location.longitude;
      return this.http.get(url + query)
        .toPromise()
        .then((response: Response) => response.json())
        .catch(err => this.handleError(err));
    });
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
   
