import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { MainPage } from '../pages/main/main';
import { ForoPage } from '../pages/foro/foro';
import { TabsPage } from '../pages/tabs/tabs';
import { CalendarComponent } from '../components/calendar/calendar';
import { MoonPhaseComponent } from '../components/moonphase/moonphase';
import { WeatherComponent } from '../components/weather/weather';
import { CropsComponent } from '../components/crops/crops';
import { MoonPhaseService } from '../providers/moonphase';
import { WeatherService } from '../providers/weather';

@NgModule({
  declarations: [
    MyApp,
    MainPage,
    ForoPage,
    TabsPage,
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
    MainPage,
    ForoPage,
    TabsPage
  ],
  providers: [ MoonPhaseService, WeatherService]
})
export class AppModule {}
