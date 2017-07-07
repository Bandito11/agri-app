import { Injectable, } from '@angular/core';
import { Http, Response } from '@angular/http';
import { config } from './../common';
import { Tips, Tip, ApiResponse } from './../types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TipsProvider {

  constructor(public http: Http) { }

  /**Returns an array containing Abundant and no production*/
  getTips(data: Tips): Observable<ApiResponse<Tip>> {
    const query = `${config.URL}/tips/${data.zodiac.toLowerCase()}&${data.phase.toLowerCase()}`;
    return this.http.get(query)
      .map((response: Response) => response.json())
      .catch(err => this.handleError(err));
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error;
    }
    return Observable.throw(errMsg);
  }
}
