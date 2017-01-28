
export interface iAerisConfig {
    id: string;
    secret: string
};

export interface iCalendar {
    weekDay: number,
    day: number,
    month: number,
    year: number
};

export interface iCrop {
    crop: string;
    abundance: Array<number>;
    beginOrProduction: Array<number>;
    noProduction: Array<number>;
    icon: string;
};

export interface iCoordinates {
    latitude: number;
    longitude: number;
};

export interface iMoonPhase {
    phase: string;
    icon: string;
    english: string;
    full: string;
};

export interface iWeather {
    icon: string;
    temp: string;
    weatherState: string;
    precipitation: string;
    humidity: string;
    wind: string;
    pressure: string;
    location: string;
};
