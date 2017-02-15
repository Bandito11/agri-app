import { Injectable, } from '@angular/core';
import { Http, Response } from '@angular/http';
// import { iCrop } from './../types';
import { url } from './../common';
@Injectable()

/**
 * TODO: 
 * a. write docs
 * b. get data from server
 */
export class CropService {

    constructor(private http: Http) { }

    /**Returns an array containing Abundant and no production*/
    getCropsByMonth(month: number): Promise<any> {
        let query = '/crops/' + month;
        return this.http.get(url + query)
            .toPromise()
            .then((response: Response) => response.json())
            .catch(err => this.handleError(err));
    }
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}