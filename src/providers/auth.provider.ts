import { Injectable, } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { config } from './../common';
import { ApiResponse } from './../types';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class AuthProvider {

    constructor(private http: Http) { }

    private response: ApiResponse<string>;
    async getToken(): Promise<ApiResponse<string>> {
        const query = `${config.URL}/auth/`;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        const body = { 'password': config.password };
        return this.http.post(query, body, options)
        .toPromise()
            .then((response: Response) => this.response = response.json())
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
        return Promise.reject(error);
    }
}
