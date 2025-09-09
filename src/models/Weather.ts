// Base weather data interface with common properties
interface BaseWeatherData {
    datetime: string;
    datetimeEpoch: number;
    temp: number;
    feelslike: number;
    humidity?: number;
    dew?: number;
    precip?: number;
    precipprob?: number;
    snow?: number;
    snowdepth?: number;
    preciptype?: string[];
    windgust?: number;
    windspeed?: number;
    winddir?: number;
    pressure?: number;
    visibility?: number;
    cloudcover?: number;
    solarradiation?: number;
    solarenergy?: number;
    uvindex?: number;
    severerisk?: number;
    conditions?: string;
    icon?: string;
    source?: string;
}

// Hour-specific weather data
interface HourWeatherData extends BaseWeatherData {
    datetime: string; // Format: "HH:mm:ss"
}

// Day-specific weather data
interface DayWeatherData extends BaseWeatherData {
    datetime: string; // Format: "YYYY-MM-DD"
    tempmax?: number;
    tempmin?: number;
    feelslikemax?: number;
    feelslikemin?: number;
    sunrise?: string;
    sunset?: string;
    moonphase?: number;
    description?: string;
    stations?: Record<string, any>;
    hours: HourWeatherData[];
}

// Current conditions interface
interface CurrentConditions extends BaseWeatherData {
    datetime: string; // Format: "YYYY-MM-DDTHH:mm:ss"
}

// Weather alert interface
interface WeatherAlert {
    event: string;
    headline?: string;
    ends?: string;
    endsEpoch?: number;
    onset?: string;
    onsetEpoch?: number;
    id?: string;
    language?: string;
    link?: string;
    description: string;
}

// Main weather response interface
interface WeatherResponse {
    address: string;
    alerts?: WeatherAlert[];
    currentConditions?: CurrentConditions;
    days: DayWeatherData[];
    description: string;
    latitude: number;
    longitude: number;
    resolvedAddress: string;
    stations?: Record<string, any>;
    timezone: string;
    tzoffset: number;
}

// Utility types for common use cases
type WeatherIcon =
    | 'snow'
    | 'rain'
    | 'fog'
    | 'wind'
    | 'cloudy'
    | 'partly-cloudy-day'
    | 'partly-cloudy-night'
    | 'clear-day'
    | 'clear-night';

type PrecipitationType = 'rain' | 'snow' | 'ice' | 'freezingrain';

// Export all types
export type {
    WeatherResponse,
    DayWeatherData,
    HourWeatherData,
    CurrentConditions,
    WeatherAlert,
    BaseWeatherData,
    WeatherIcon,
    PrecipitationType
};

