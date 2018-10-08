import { injectable, inject } from "inversify";
import "reflect-metadata";
import { IRegistration } from "@/bootstrapper";

// -- should live in their own files
export interface IWeapon {
  name: string;
}

@injectable()
export class FoamBat implements IWeapon {
  public static readonly registration: IRegistration = {
    key: "weapon"
  };

  public name = "Foam Bat!";
}

export interface IWarrior {
  name: string;
  weapon: IWeapon;
}

let warriorCount = 0;

@injectable()
export class Warrior implements IWarrior {
  public static readonly registration: IRegistration = {
    key: "warrior"
  };

  public name = `Warrior #${++warriorCount}`;
  constructor(
    // requires access to local service identifiers...
    @inject(FoamBat.registration.key) public weapon: IWeapon
  ) {}
}

// --
