import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { iCoordinate, iCalendar, iWeather } from './../models';
import { Geolocation } from 'ionic-native';
import 'rxjs/add/operator/toPromise';
/*
  TODO:
*/
@Injectable()
export class WeatherService {

  constructor(private http: Http) { }

  //Get coordinates from device
  getCoords(): Promise<iCoordinate> {
    return Geolocation.getCurrentPosition().then((resp) => {
      let location: iCoordinate = { longitude: 0, latitude: 0 };
      location.latitude = resp.coords.latitude;
      location.longitude = resp.coords.longitude;
      return location;
    })
      .catch(err => this.handleError(err));
  }

  //Get weather info from api
  getWeatherSummary(date: iCalendar): Promise<iWeather> {
    return this.getCoords().then(location => {
    let url = "http://localhost:3000";
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

