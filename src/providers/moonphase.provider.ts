import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Calendar, MoonPhase, ApiResponse } from './../types';
import { LocationProvider } from './location.provider';
import { config } from './../common';

import 'rxjs/add/operator/toPromise';
/*
  TODO:
  a. make it so that it returns iMoonPhase
*/
@Injectable()
export class MoonPhaseProvider {

  constructor(public http: Http, private locationProvider: LocationProvider) { }

  /**Will return the moonphase*/
  async getMoonPhase(data: {date: Calendar, token: string}): Promise <ApiResponse<MoonPhase>> {
    const location = await this.locationProvider.getLocation();
    const today = new Date();
    const headers = new Headers({'x-access-token': data.token, 'Content-Type': 'application/json'})
    const options = new RequestOptions({headers: headers});
    const query = `${config.URL}/moonphase/${data.date.year}&${data.date.month}&${data.date.day}&${location.latitude}&${location.longitude}&${today.getHours()}&${today.getMinutes()}&${today.getSeconds()}`;
    return this.http.get(query, options)
      .toPromise()
      .then((response: Response) => response.json())
      .catch(err => this.handleError(err));

  }

  private handleError(error) {
    return Promise.reject(error.message || error);
  }
}

