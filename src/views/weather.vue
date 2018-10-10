<template>
  <div>
    <div v-if="weatherResponse">
      <weather-details :weather="details"></weather-details>
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
  import { Component, Prop, Watch } from "vue-property-decorator";
  import { queryExecutor } from "../query-executor";
  import { IWeatherResponse, WeatherQuery, IWeatherDetail } from "../weather-query";

  @Component({
    name: "weather",
    watch: {
      "$route"(to, from) {
        console.log(to, from);
        this.refresh(to.params["city"]);
      }
    }
  })
  export default class WeatherComponent extends Vue {
    public get weather() {
      return this.weatherResponse
        ? this.weatherResponse.weather[0].main
        : null;
    }

    public details: IWeatherDetail | null = null;
    private weatherResponse: IWeatherResponse | null = null;

    public async created() {
      await this.refresh(this.$route.params["city"] || "durban");
    }

    public async refresh(city: string) {
      this.weatherResponse = null;
      this.weatherResponse = await queryExecutor.execute(
        new WeatherQuery(city)
      );
      this.details = this.weatherResponse.weather[0];
    }
  }
</script>

