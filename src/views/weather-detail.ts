import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IWeatherDetail } from "@/weather-query";

@Component({
  name: "weather-details"
})
export default class WeatherDetails extends Vue {
  @Prop()
  public weather: IWeatherDetail;
  public get iconUrl() {
    if (!this.weather) {
      return null;
    }
    return `http://openweathermap.org/img/w/${this.weather.icon}.png`;
  }
}
