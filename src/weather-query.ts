import { IQuery, Query } from "./query-executor";
import { check } from "./check";

const apiKey = "2b8e7ea0a587152c9dbb0752edc8977f";

export interface IWeatherResponse {
  dt: number;
  main: IWeatherItemMain;
  weather: IWeatherDetail[];
  clouds: IClouds;
  wind: IWind;
  snow: ISnow;
  sys: ISys;
  dt_txt: string;
  name: string;
}

export interface IClouds {
  all: number;
}

export interface IWind {
  speed: number;
  deg: number;
}

export interface ISnow {
    id: number;
}

export interface ISys {
  pod: string;
}

export interface IWeatherDetail {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherItemMain {
  temp: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

export class WeatherQuery extends Query implements IQuery<IWeatherResponse> {

  constructor(public city: string) {
      super();
  }

  public validate(): void | Promise<void> {
      check.that(this.city).isSet("city");
  }

  public execute(): IWeatherResponse | Promise<IWeatherResponse> {
    const url = this._generateUrl();
    return this.get(url);
  }

  private _generateUrl(): any {
      return `${apiUrl}?q=${this.city}&appId=${apiKey}`;
  }
}
