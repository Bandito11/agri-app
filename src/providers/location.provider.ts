import { Injectable } from '@angular/core';
import { iCoordinates } from './../types';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocationProvider {

    constructor(private geolocation: Geolocation) { }

    /**Get coordinates from device*/
    getLocation(): Promise<iCoordinates> {

        return new Promise((resolve, reject) => {
            this.geolocation.getCurrentPosition().then((resp) => {
                let coordinates: iCoordinates = { latitude: 0, longitude: 0 };
                coordinates.latitude = resp.coords.latitude;
                coordinates.longitude = resp.coords.longitude;
                resolve(coordinates);
            })
                .catch(err => this.handleError(err));
        });
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
