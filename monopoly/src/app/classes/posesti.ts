export class Posest {
    _id: String;
    ime: String;
    cena: Number;
    trenutniLastnik: {id: String, ime: String};
    barva: String;
    hise: Number;
    doprinesenaVrednost: Number;

    constructor(ime: String){
        this.ime = ime
    }
}