import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Calendar, Weather, ApiResponse, Coordinates } from './../types';
import { LocationProvider } from './location.provider';
import { config } from './../common';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WeatherProvider {
  constructor(private http: Http, private locationProvider: LocationProvider) { }

  /**
   * Get weather summary or forecast
   * 
   * @param {{ date: Calendar, token: string }} data 
   * @returns {Promise<ApiResponse<Weather>>} 
   * @memberof WeatherProvider
   */
  async getWeather(data: { date: Calendar, token: string }): Promise<ApiResponse<Weather>> {
    let location: Coordinates;
    try {
      location = await this.locationProvider.getLocation();
    } catch (error) {
      console.error(error);
      Promise.reject(error);
    }
    const params = { 'token': data.token };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, params: params });
    const query = `${config.URL}/weather/${data.date.year}&${data.date.month}&${data.date.day}&${location.latitude}&${location.longitude}`;
    return this.http.get(query, options)
      .toPromise()
      .then((response: Response) => response.json())
      .catch(err => this.handleError(err));
  }

  private handleError(error): Promise<any> {
    return Promise.reject(error);
  }
}

