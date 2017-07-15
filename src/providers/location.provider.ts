import { Injectable } from '@angular/core';
import { Coordinates } from './../types';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocationProvider {

    constructor(private geolocation: Geolocation) { }
    /**
     * Get coordinates from device
     * 
     * @returns {Promise<iCoordinates>} 
     * 
     * @memberof LocationProvider
     */
    getLocation(): Promise<Coordinates> {
        return new Promise((resolve, reject) => {
            this.geolocation.getCurrentPosition()
                .then(resp => {
                    let coordinates: Coordinates = { latitude: 0, longitude: 0 };
                    coordinates.latitude = resp.coords.latitude;
                    coordinates.longitude = resp.coords.longitude;
                    resolve(coordinates);
                })
                .catch((error) => this.handleError(error));
        });
    }
    /**
     * 
     * 
     * @private
     * @param {*} error 
     * @returns 
     * 
     * @memberof LocationProvider
     */
    private handleError(error) {
        return Promise.reject(error.message || error);
    }
}
