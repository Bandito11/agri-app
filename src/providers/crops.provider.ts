import { Injectable, } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { config } from './../common';
import { ApiResponse, Crop, } from './../types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

/**
 * TODO: 
 * a. generate a type to return for getCrops
 * 
 */
export class CropProvider {

    constructor(private http: Http) { }

    /**Returns an array containing Abundant and no production*/
    getCropsByMonth(data: { month: number, mode: string, token: string}): Observable<ApiResponse<Crop[]>> {
        const body = { 'token': data.token };
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers, params: body });
        const query = `${config.URL}/crops/${data.month}&${data.mode}`;
        return this.http.get(query, options)
            .map((response: Response) => response.json())
            .catch(err => this.handleError(err));
    }
    private handleError(error: ApiResponse<undefined>) {
        console.error(error);
        return Observable.throw(error);
    }
}
