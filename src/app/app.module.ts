import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { MainPage } from '../pages/main/main.page';
//import { TabsPage } from '../pages/tabs/tabs.page';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { MoonPhaseComponent } from '../components/moonphase/moonphase.component';
import { WeatherComponent } from '../components/weather/weather.component';
import { CropsComponent } from '../components/crops/crops.component';
import { MoonPhaseProvider } from '../providers/moonphase.provider';
import { WeatherProvider } from '../providers/weather.provider';
import { LocationProvider } from '../providers/location.provider';
import { CropProvider } from '../providers/crops.provider';

@NgModule({
  declarations: [
    MyApp,
    MainPage,
    CalendarComponent,
    MoonPhaseComponent,
    WeatherComponent,
    CropsComponent
  ],
  imports: [
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainPage
  ],
  providers: [MoonPhaseProvider, WeatherProvider, LocationProvider, CropProvider]
})

export class AppModule { }
