<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/about">About</router-link>
        </div>
        <router-view/>
    </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IWeapon, IWarrior } from "@/some-services";
import SubAbout from "./views/SubAbout.vue";

import { Bootstrapper } from "./bootstrapper";
const bootstrapper = new Bootstrapper();
const provide = bootstrapper.bootstrap();

@Component({
  name: "App",
  components: { SubAbout },
  provide
})
export default class AppComponent extends Vue {}
</script>

