import { iCoordinates } from './../types';

export class CoordinatesModel implements iCoordinates {
    latitude: number;
    longitude: number;
    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
