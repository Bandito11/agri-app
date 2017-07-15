import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Calendar, MoonPhase, ApiResponse, Coordinates } from './../types';
import { config } from './../common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MoonPhaseProvider {

  constructor(private http: Http) { }
  
  /**
   * Will return the current moonphase
   * 
   * @param {{ date: Calendar, token: string }} data 
   * @returns {Observable<ApiResponse<MoonPhase>>} 
   * @memberof MoonPhaseProvider
   */ 
  getMoonPhase(data: { date: Calendar, token: string, location: Coordinates }): Observable<ApiResponse<MoonPhase>> {
    const today = new Date();
    const params = { 'token': data.token };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, params: params });
    const query = `${config.URL}/moonphase/${data.date.year}&${data.date.month}&${data.date.day}&${data.location.latitude}&${data.location.longitude}&${today.getHours()}&${today.getMinutes()}&${today.getSeconds()}`;
    return this.http.get(query, options)
      .map((response: Response) => response.json())
      .catch(err => this.handleError(err));
  }

  private handleError(error) {
    return Observable.throw(error);
  }
}

