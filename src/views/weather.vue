<template>
<div>
    <div v-if="weatherResponse">
        {{ weather }}
    </div>
    <div v-else>
        (waiting for weather data)
    </div>
    <button @click="refresh">Refresh</button>
    </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { queryExecutor } from "../query-executor";
import { IWeatherResponse, WeatherQuery } from "../weather-query";

@Component({
  name: "weather"
})
export default class WeatherComponent extends Vue {
  public get weather() {
    return this.weatherResponse
      ? this.weatherResponse.weather[0].main
      : null;
  }
  private weatherResponse: IWeatherResponse | null = null;

  public async mounted() {
    await this.refresh();
  }

  public async refresh() {
    this.weatherResponse = await queryExecutor.execute(
      new WeatherQuery("Durban")
    );
  }
}
</script>

