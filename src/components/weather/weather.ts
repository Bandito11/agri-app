import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { WeatherService } from './../../providers/weather';
import { iCalendar } from './../../models';

/*
    TODO:
    Make an icon array for each possible weather state
    make an array of possible weather states
    Give an animation for when the data is loading
*/
@Component({
    selector: 'weather-component',
    templateUrl: 'weather.html'
})
export class WeatherComponent implements OnInit, OnChanges {

    constructor(private weatherService: WeatherService) { }

    @Input() date: iCalendar;
    //weather html properties
    currentTempIcon: string;
    currentTemp: string;
    currentLocation: string;
    weatherState: string; //Weather brief description
    precipitation: string;
    humidity: string;
    pressure: string;
    wind: string;

    ngOnInit() {
        this.getWeather(this.date);
    }

    ngOnChanges(changes) {
        this.getWeather(changes.date.currentValue);
    }

    getWeather(date: iCalendar) {
        //TODO:
        //Make an icon array for each possible weather state
        //make an array of possible weather states
        this.weatherService.getWeatherSummary(date)
            .then(api => {
                this.currentLocation = api.location.slice(1, api.location.length);
                this.currentTempIcon = api.icon;
                this.currentTemp = api.temp;
                this.weatherState = api.weatherState;
                this.precipitation = api.precipitation;
                this.humidity = api.humidity;
                this.wind = api.wind;
                this.pressure = api.pressure;

            }).catch(err => this.handleError(err));
    }

    handleError(err) {
        console.log(err);
    }
}