import { Component, OnInit, OnChanges, Input } from '@angular/core';
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

export class WeatherComponent implements OnInit, OnChanges {

    constructor(private weatherService: WeatherProvider) { }

    @Input() date: Calendar;
    /**currentTempIcon html properties*/
    private currentTempIcon: string;
    /**currentTemp html properties*/
    private currentTemp: string;
    /**currentLocation html properties*/
    private currentLocation: string;
    /**weatherState html properties*/
    private weatherState: string; //Weather brief description
    /**precipitation html properties*/
    private precipitation: string;
    /**humidity html properties*/
    private humidity: string;
    /**pressure html properties*/
    private pressure: string;
    /**wind html properties*/
    private wind: string;

    ngOnInit() {
        this.getWeather(this.date);
    }

    ngOnChanges(changes) {
        this.getWeather(changes.date.currentValue);
    }
    /**Returns the summary of the current weather for the date given */
    getWeather(date: Calendar) {
        //TODO:
        //Make an icon array for each possible weather state
        //make an array of possible weather states
        this.weatherService.getWeather(date)
            .then(api => {
                this.currentLocation = api.data[0].location;
                this.currentTempIcon = api.data[0].icon;
                this.currentTemp = api.data[0].temp;
                this.weatherState = api.data[0].weatherState;
                this.precipitation = api.data[0].precipitation;
                this.humidity = api.data[0].humidity;
                this.wind = api.data[0].wind;
                this.pressure = api.data[0].pressure;
            })
            .catch(err => this.handleError(err));
    }

    handleError(err) {
        console.log(err);
        this.currentLocation = err;
    }
}
