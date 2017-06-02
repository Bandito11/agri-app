import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { MainPage } from '../pages/main/main.page';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { MoonPhaseComponent } from '../components/moonphase/moonphase.component';
import { WeatherComponent } from '../components/weather/weather.component';
import { CropsComponent } from '../components/crops/crops.component';
import { MoonPhaseProvider } from '../providers/moonphase.provider';
import { WeatherProvider } from '../providers/weather.provider';
import { LocationProvider } from '../providers/location.provider';
import { CropProvider } from '../providers/crops.provider';
import { NoprodComponent } from '../components/noprod/noprod';
import { AbundanceComponent } from '../components/abundance/abundance';
import { TipsComponent } from '../components/tips/tips';
import { TipsProvider } from '../providers/tips/tips';

@NgModule({
  declarations: [
    MyApp,
    MainPage,
    CalendarComponent,
    MoonPhaseComponent,
    WeatherComponent,
    CropsComponent,
    NoprodComponent,
    AbundanceComponent,
    TipsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainPage
  ],
  providers: [
    MoonPhaseProvider,
    WeatherProvider,
    LocationProvider,
    CropProvider,
    StatusBar,
    SplashScreen,
    Geolocation,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    TipsProvider
  ]
})

export class AppModule { }
