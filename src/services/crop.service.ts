import { Injectable, } from '@angular/core';
import { Http, Response } from '@angular/http';
import { iCrop } from './../types';

@Injectable()

/**
 * TODO: 
 * a. write docs
 * b. get data from server
 */
export class CropService {
    private url = 'http://localhost:3000';

    constructor(private http: Http) { }

    /**Returns an array containing Abundant and no production*/
    getCropsByMonth(month: number): Promise<any> {
        let query = '/vegetable/' + month;
        return this.http.get(this.url + query)
            .toPromise()
            .then((response: Response) => response.json())
            .catch(err => this.handleError(err));
    }
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}