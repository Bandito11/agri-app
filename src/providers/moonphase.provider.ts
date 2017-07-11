import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Calendar, MoonPhase, ApiResponse, Coordinates } from './../types';
import { LocationProvider } from './location.provider';
import { config } from './../common';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MoonPhaseProvider {

  constructor(public http: Http, private locationProvider: LocationProvider) { }
/**
 * Will return the moonphase
 * 
 * @param {{ date: Calendar, token: string }} data 
 * @returns {Promise<ApiResponse<MoonPhase>>} 
 * @memberof MoonPhaseProvider
 */
  async getMoonPhase(data: { date: Calendar, token: string }): Promise<ApiResponse<MoonPhase>> {
    let location: Coordinates;
    try {
      location = await this.locationProvider.getLocation();
    } catch (error) {
      console.error(error);
      Promise.reject(error);
    }
    const today = new Date();
    const params = { 'token': data.token };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, params: params });
    const query = `${config.URL}/moonphase/${data.date.year}&${data.date.month}&${data.date.day}&${location.latitude}&${location.longitude}&${today.getHours()}&${today.getMinutes()}&${today.getSeconds()}`;
    return this.http.get(query, options)
      .toPromise()
      .then((response: Response) => response.json())
      .catch(err => this.handleError(err));
  }

  private handleError(error) {
    return Promise.reject(error);
  }
}

