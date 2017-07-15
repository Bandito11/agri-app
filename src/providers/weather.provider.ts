import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Calendar, Weather, ApiResponse, Coordinates } from './../types';
import { config } from './../common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherProvider {

  constructor(private http: Http) { }
  
  /**
   * Get weather summary or forecast
   * 
   * @param {{ date: Calendar, token: string }} data 
   * @returns {Promise<ApiResponse<Weather>>} 
   * @memberof WeatherProvider
   */
  getWeather(data: { date: Calendar, token: string, location: Coordinates }): Observable<ApiResponse<Weather>> {
    const params = { 'token': data.token };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, params: params });
    const query = `${config.URL}/weather/${data.date.year}&${data.date.month}&${data.date.day}&${data.location.latitude}&${data.location.longitude}`;
    return this.http.get(query, options)
      .map((response: Response) => response.json())
      .catch(err => this.handleError(err));
  }

  private handleError(error) {
    return Observable.throw(error);
  }
}

