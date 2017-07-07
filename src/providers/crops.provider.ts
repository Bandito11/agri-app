import { Injectable, } from '@angular/core';
import { Http, Response } from '@angular/http';
import { config } from './../common';
import { ApiResponse, Crop } from './../types';
// import 'rxjs/add/operator/toPromise';
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
    getCropsByMonth(data: { month: number, mode: string }): Observable<ApiResponse<Crop>> {
        const query = `${config.URL}/crops/${data.month}&${data.mode}`;
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
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
