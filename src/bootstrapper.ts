import { Container } from "inversify";
import Vue from "vue";
import _ from "lodash";

export enum LifeCycles {
  transient,
  singleton,
  request
}
export interface IRegistration {
  key: string;
  lifeCycle?: LifeCycles;
}

type Provide = { [key: string]: string | object };

export class Bootstrapper {
  public static readonly RegistationProperty = "registration";
  public static readonly ContainerRegistrationKey = "container";
  public static readonly containerRegistration: IRegistration = {
    key: Bootstrapper.ContainerRegistrationKey
  };

  public bootstrap(): object {
    const provide: Provide = {};
    const container = this.createContainer(provide);
    this.autoRegister(provide, container);
    return provide;
  }

  private createContainer(provide: Provide): Container {
    const container = new Container();
    provide[Bootstrapper.ContainerRegistrationKey] = container;
    container
      .bind(Bootstrapper.ContainerRegistrationKey)
      .toConstantValue(container);
    return container;
  }

  private autoRegister(identifiers: Provide, container: Container): void {
    container
      .bind(Bootstrapper.ContainerRegistrationKey)
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
          Bootstrapper.RegistationProperty
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
    provide[registration.key] = exported;
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
          break;
      }
    }
  }

  private registerComponent(exported: object): void {
    const tag = _.get(exported, "extendOptions.name");
    if (tag) {
      Vue.component(tag, exported);
    }
  }
}
