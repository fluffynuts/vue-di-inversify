import { shallowMount } from "@vue/test-utils";
import { company } from "faker";
import { IWeatherDetail } from "@/weather-query";
import WeatherDetails from "@/views/weather.vue";
import "jasmine-expect";

describe("weather-details.vue", () => {
  it(`should set the weather main string as a header`, () => {
    // Arrange
    const weather = {
      main: company.bs()
    } as IWeatherDetail,
    wrapper = shallowMount(WeatherDetails, {
      propsData: {
        weather
      }
    });
    // Act
    const heading = wrapper.vm.$el.querySelector("h3");
    // Assert
    expect(heading).not.toBeNull();
    if (heading !== null) {
      expect(heading.textContent).toEqual(weather.main);
    }
  });
});
