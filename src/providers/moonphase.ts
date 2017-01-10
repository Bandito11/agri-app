import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { iCalendar, iMoonPhase } from './../models';
import { WeatherService } from './weather';
import 'rxjs/add/operator/toPromise';
/*
  TODO:
*/
@Injectable()
export class MoonPhaseService {

  constructor(public http: Http, private weatherService: WeatherService) { }

  //Will return the response from Aeris Weather
  getMoonPhaseInfo(date: iCalendar): Promise<iMoonPhase> {
    return this.weatherService.getCoords().then(location => {
      let url: string = "http://localhost:3000";
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
