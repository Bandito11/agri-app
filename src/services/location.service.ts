import { Injectable } from '@angular/core';
import { iCoordinates } from './../types';
import { Geolocation } from 'ionic-native';

@Injectable()
export class LocationService {

    constructor() { }

    /**Get coordinates from device*/
    getLocation(): Promise<iCoordinates> {
        return Geolocation.getCurrentPosition().then((resp) => {
            let coordinates: iCoordinates = { latitude: 0, longitude: 0 };
            coordinates.latitude = resp.coords.latitude;
            coordinates.longitude = resp.coords.longitude;
            return coordinates;
        })
            .catch(err => this.handleError(err));
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}