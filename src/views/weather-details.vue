<template>
<div v-if="weather">
    <h3>{{ weather.main }} </h3>
    <img :src="iconUrl"/>
</div>
<div v-else>
    ):
</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IWeatherResponse, IWeatherItemOverview } from "@/weather-query";

@Component({
  name: "weather-details",
  props: {
      weather: Object
  }
})
export default class WeatherDetails extends Vue {
  public weather: IWeatherItemOverview;
  public get iconUrl() {
    if (!this.weather) {
      return null;
    }
    return `http://openweathermap.org/img/w/${this.weather.icon}.png`;
  }
}
</script>
