import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Calendar, Weather, ApiResponse } from './../types';
import { LocationProvider } from './location.provider';
import { config } from './../common';

import 'rxjs/add/operator/toPromise';
/*
  TODO:
  a. make it so that it returns iWeather
*/
@Injectable()
export class WeatherProvider {
  constructor(private http: Http, private locationProvider: LocationProvider) { }

  /**Get weather summary*/
  async getWeather(date: Calendar): Promise<ApiResponse<Weather>> {
    const location = await this.locationProvider.getLocation();
    const query = `/weather/${date.year}&${date.month}&${date.day}&${location.latitude}&${location.longitude}`;
    return this.http.get(query)
      .toPromise()
      .then((response: Response) => response.json())
      .catch(err => this.handleError(err));
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}

