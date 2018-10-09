import { Container } from "inversify";
import Vue from "vue";
import _ from "lodash";

import { check } from "./check";

check.that(1).isKey("id");

export enum LifeCycles {
  transient,
  singleton,
  request
}
export interface IRegistration {
  key: string;
  lifeCycle?: LifeCycles;
  provide?: boolean;
}

type Provide = { [key: string]: string | object };

export class Bootstrapper {
  public static readonly registationProperty = "registration";
  public static readonly containerRegistrationKey = "container";
  public static readonly containerRegistration: IRegistration = {
    key: Bootstrapper.containerRegistrationKey
  };

  public bootstrap(): object {
    const provide: Provide = {};
    const container = this.createContainer(provide);
    this.autoRegister(provide, container);
    return provide;
  }

  private createContainer(provide: Provide): Container {
    const container = new Container();
    provide[Bootstrapper.containerRegistrationKey] = container;
    container
      .bind(Bootstrapper.containerRegistrationKey)
      .toConstantValue(container);
    return container;
  }

  private autoRegister(identifiers: Provide, container: Container): void {
    container
      .bind(Bootstrapper.containerRegistrationKey)
      .toConstantValue(container);

    const ctx = require.context("/", true);
    ctx.keys().forEach(moduleName => {
      if (moduleName.endsWith(".d") || moduleName.endsWith(".ts")) {
        return; // webpack giving a file reference (not all that interesting)
      }
      let mod: { [key: string]: any };

      try {
        mod = ctx(moduleName);
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.error(`Unable to load ${moduleName}: ${e}`);
        return;
      }

      Object.keys(mod).forEach(exportedKey => {
        const exported = mod[exportedKey];
        if (exported.prototype instanceof Vue) {
          this.registerComponent(exported);
          return;
        }
        const registration = _.get(
          exported,
          Bootstrapper.registationProperty
        ) as IRegistration;
        if (registration && registration.key) {
          this.registerService(
            registration,
            identifiers,
            container,
            exported,
            moduleName
          );
        }
      });
    });
  }

  private registerService(
    registration: IRegistration,
    provide: Provide,
    container: Container,
    exported: any,
    moduleName: string
  ) {
    if (provide[registration.key]) {
      throw new Error(
        `Duplicate serviceKey "${registration.key}" in ${moduleName}`
      );
    }
    const binding = container.bind(registration.key).to(exported);
    if (registration.lifeCycle !== undefined) {
      switch (registration.lifeCycle) {
        case LifeCycles.request:
          binding.inRequestScope();
          break;
        case LifeCycles.transient:
          binding.inTransientScope();
          break;
        case LifeCycles.singleton:
          binding.inSingletonScope();
          provide[registration.key] = container.get(registration.key);
          break;
      }
    }
    if (registration.provide) {
      provide[registration.key] = () => container.get(registration.key);
    }
  }

  private registerComponent(exported: object): void {
    const tag = _.get(exported, "extendOptions.name");
    if (tag) {
      Vue.component(tag, exported);
    }
  }
}
