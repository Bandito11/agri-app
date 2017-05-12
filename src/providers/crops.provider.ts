import { Injectable, } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URL } from './../common';

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
    getCropsByMonth(month: number) {
        let query = '/crops/' + month;
        return this.http.get(URL + query)
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
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
