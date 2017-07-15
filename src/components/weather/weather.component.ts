import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherProvider } from './../../providers/weather.provider';
import { Calendar } from './../../types';

/*
    TODO:
    Make an icon array for each possible weather state
    make an array of possible weather states
    Give an animation for when the data is loading
*/
@Component({
    selector: 'weather-component',
    templateUrl: 'weather.component.html'
})

export class WeatherComponent implements OnChanges {

    constructor(private weatherProvider: WeatherProvider) { }

    @Input() location: Coordinates;
    @Input() token: string;
    @Input() date: Calendar;
    /**
     * html properties
     * 
     * @private
     * @type {string}
     * @memberof WeatherComponent
     */
    private currentTempIcon: string;
    /**
     * html properties
     * 
     * @private
     * @type {string}
     * @memberof WeatherComponent
     */
    private currentTemp: string;
    /**
     * html properties
     * 
     * @private
     * @type {string}
     * @memberof WeatherComponent
     */
    private currentLocation: string;
    /**
     * html properties
     * 
     * @private
     * @type {string}
     * @memberof WeatherComponent
     */
    private weatherState: string;
    /**
     * html properties
     * 
     * @private
     * @type {string}
     * @memberof WeatherComponent
     */
    private precipitation: string;
    /**
     * html properties
     * 
     * @private
     * @type {string}
     * @memberof WeatherComponent
     */
    private humidity: string;
    /**
     * html properties
     * 
     * @private
     * @type {string}
     * @memberof WeatherComponent
     */
    private pressure: string;
    /**
     * html properties
     * 
     * @private
     * @type {string}
     * @memberof WeatherComponent
     */
    private wind: string;
    /**
     * Temporary date to be used on ngOnChanges
     * 
     * @private
     * @type {Calendar}
     * @memberof WeatherComponent
     */
    private tempDate: Calendar;
    /**
     * Temporary token to be used on ngOnChanges
     * 
     * @private
     * @type {string}
     * @memberof WeatherComponent
     */
    private tempToken: string;
    /**
     * Temporary coordinates to be used on ngOnChanges
     * 
     * @private
     * @type {Coordinates}
     * @memberof MoonPhaseComponent
     */
    private tempLocation: Coordinates;

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            if (propName == 'location') {
                this.tempLocation = changes[propName].currentValue;
            }
            if (propName == 'date') {
                this.tempDate = changes[propName].currentValue;
            }
            if (propName == 'token') {
                this.tempToken = changes[propName].currentValue;
            }
        }
        if (this.tempDate && this.tempToken && this.tempLocation) {
            try {
                this.getWeather({
                    date: this.tempDate,
                    token: this.tempToken,
                    location: this.tempLocation
                });
            } catch (error) {
                console.error(error);
            }
        }
    }
    /**Returns the summary of the current weather for the date given */
    async getWeather(data: { date: Calendar, token: string, location: Coordinates }) {
        this.weatherProvider.getWeather({
            date: data.date,
            token: data.token,
            location: data.location
        })
            .subscribe(
            response => {
                try {
                    if (response.success == true) {
                        this.currentLocation = response.data.location;
                        this.currentTempIcon = response.data.icon;
                        this.currentTemp = response.data.temp;
                        this.weatherState = response.data.weatherState;
                        this.precipitation = response.data.precipitation;
                        this.humidity = response.data.humidity;
                        this.wind = response.data.wind;
                        this.pressure = response.data.pressure;
                    } else if (response.error == null) {
                        throw new Error(response.error);
                    } else {
                        this.handleError(response.error);
                    }
                } catch (error) {
                    this.handleError(error);
                }
            },
            error => this.handleError(error)
            )
    }

    handleError(error) {
        console.log(error);
        this.currentLocation = error;
        this.currentTempIcon = "";
        this.currentTemp = "";
        this.weatherState = "";
        this.precipitation = "";
        this.humidity = "";
        this.wind = "";
        this.pressure = "";

    }
}
