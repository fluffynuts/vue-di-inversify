<template>
<div>
    <p>
        Warrior instance:
    {{ warriorInstance.name }}
    </p>
    Warrior collection:
    <p v-for="warrior of warriors" v-bind:key="warrior.name">
        {{ warrior.name }}
    </p>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Inject } from "vue-property-decorator";
import { IWeapon, IWarrior, Warrior } from "@/some-services";
import Component from "vue-class-component";
import { Container } from "inversify";
import { Bootstrapper } from "@/bootstrapper";

@Component({
  name: "sub-about"
})
export default class SubAboutComponent extends Vue {
  @Inject(Bootstrapper.containerRegistration.key)
  private container: Container;

  @Inject(Warrior.registration.key)
  private warriorInstance: IWarrior;

  private warriors: IWarrior[];

  constructor() {
    super();
    this.warriors = [
      this.container.get<IWarrior>(Warrior.registration.key),
      this.container.get<IWarrior>(Warrior.registration.key),
      this.container.get<IWarrior>(Warrior.registration.key)
    ];
  }
}
</script>
