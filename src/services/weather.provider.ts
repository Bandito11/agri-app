import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { iCalendar, iWeather } from './../types';
import { LocationProvider } from './location.provider';
import { url } from './../common';

import 'rxjs/add/operator/toPromise';
/*
  TODO:
*/
@Injectable()
export class WeatherProvider {
  constructor(private http: Http, private locationService: LocationProvider) { }

  /**Get weather summary*/
  getWeather(date: iCalendar): Promise<iWeather> {
    return this.locationService.getLocation().then(location => {
      let query = "/weather/" + date.year + '&' + date.month + '&' + date.day + '&' + location.latitude + '&' + location.longitude;
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

