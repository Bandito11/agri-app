
export interface iAerisConfig {
    id: string;
    secret: string
};

export interface iCalendar {
    weekDay?: number,
    day: number,
    month: number,
    year: number
};

export interface iCrop {
    crop: string;
    icon: string;
    color: string;
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

export interface ITips {
    zodiac: string;
    phase: string;
}

export interface ITip {
    message: string;
}

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
