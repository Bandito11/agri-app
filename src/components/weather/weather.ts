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
    /**currentTempIcon html properties*/
    currentTempIcon: string;
    /**currentTemp html properties*/
    currentTemp: string;
    /**currentLocation html properties*/
    currentLocation: string;
    /**weatherState html properties*/
    weatherState: string; //Weather brief description
    /**precipitation html properties*/
    precipitation: string;
    /**humidity html properties*/
    humidity: string;
    /**pressure html properties*/
    pressure: string;
    /**wind html properties*/
    wind: string;

    ngOnInit() {
        this.getWeather(this.date);
    }

    ngOnChanges(changes) {
        this.getWeather(changes.date.currentValue);
    }
/**Returns the summary of the current weather for the date given */
    getWeather(date: iCalendar) {
        //TODO:
        //Make an icon array for each possible weather state
        //make an array of possible weather states
        this.weatherService.getWeather(date)
            .then(api => {
                this.currentLocation = api.location;
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
