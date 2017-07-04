export type Calendar = {
    weekDay?: number,
    day: number,
    month: number,
    year: number
}

export type Crop = {
    crop: string,
    icon: string,
    color: string,
}

export type Coordinates = {
    latitude: number,
    longitude: number,
}

export type MoonPhase = {
    phase: string,
    icon: string,
    full: string,
}

export type Tips = {
    zodiac: string,
    phase: string
}

export type Tip = {
    message: string
}

export type Weather = {
    icon: string,
    temp: string,
    weatherState: string,
    precipitation: string,
    humidity: string,
    wind: string,
    pressure: string,
    location: string
}

export type ApiResponse<T> = {
    success: boolean,
    error: string,
    token?: T;
    data?: T[]
}