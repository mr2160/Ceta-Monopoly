import { Posest } from "./posesti";
export class Vod {
    _id: String;
    ime: String;
    geslo: Number;
    denarnoStanje: Number;
    preteklih5transakcij: [String];
    aktivnePosesti: [Posest];
    lastnePosesti: [Posest];
}