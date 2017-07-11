import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { config } from './../common';
import { Tips, Tip, ApiResponse } from './../types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TipsProvider {
  constructor(public http: Http) { }
  /**
   * 
   * 
   * @param {{ tips: Tips, token: string }} data 
   * @returns {Observable<ApiResponse<Tip[]>>} 
   * @memberof TipsProvider
  
   * Returns an array containing Abundant and no production
   * 
   * @param {{ tips: Tips, token: string }} data 
   * @returns {Observable<ApiResponse<Tip[]>>} 
   * @memberof TipsProvider
   */
  getTips(data: { tips: Tips, token: string }): Observable<ApiResponse<Tip[]>> {
    const body = { 'token': data.token };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, params: body });
    const query = `${config.URL}/tips/${data.tips.zodiac.toLowerCase()}&${data.tips.phase.toLowerCase()}`;
    return this.http.get(query, options)
      .map((response: Response) => response.json())
      .catch(err => this.handleError(err));
  }

  private handleError(error: ApiResponse<undefined>) {
    console.error(error);
    return Observable.throw(error);
  }
}
