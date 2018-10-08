<template>
    <div class="about">
        <h1>This is an about page</h1>
        <sub-about></sub-about>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { injectable, inject } from "inversify";
    import { IWeapon } from "@/some-services";
    import { Component, Inject, Prop } from "vue-property-decorator";
    import SubAbout from "./SubAbout.vue";

    @Component({
        name: "About",
    })
    export default class AboutComponent extends Vue {
    }
</script>
