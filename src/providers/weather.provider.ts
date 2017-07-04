import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { iCalendar, iWeather } from './../types';
import { LocationProvider } from './location.provider';
import { URL } from './../common';

import 'rxjs/add/operator/toPromise';
/*
  TODO:
  a. make it so that it returns iWeather
*/
@Injectable()
export class WeatherProvider {
  constructor(private http: Http, private locationProvider: LocationProvider) { }

  /**Get weather summary*/
  async getWeather(date: iCalendar): Promise<iWeather> {
    const location = await this.locationProvider.getLocation();
    let query = "/weather/" + date.year + '&' + date.month + '&' + date.day + '&' + location.latitude + '&' + location.longitude;
    return this.http.get(URL + query)
      .toPromise()
      .then((response: Response) => response.json())
      .catch(err => this.handleError(err));
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

