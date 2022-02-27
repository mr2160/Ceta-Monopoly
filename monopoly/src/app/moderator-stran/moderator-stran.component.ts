import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PosestCardComponent } from '../partials/posest-card/posest-card.component';
import { Posest } from '../classes/posesti';
import { Vod } from '../classes/vodi';
import { PosestiPodatkiService } from '../services/podatki.service';
import { ThisReceiver } from '@angular/compiler';
import { concat } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moderator-stran',
  templateUrl: './moderator-stran.component.html',
  styleUrls: ['./moderator-stran.component.css']
})


export class ModeratorStranComponent implements OnInit {
  @ViewChild('vodAkt') vodAkt: ElementRef;
  @ViewChild('posestAkt1') posestAkt1: ElementRef;
  @ViewChild('posestAkt2') posestAkt2: ElementRef;
  @ViewChild('posestAkt3') posestAkt3: ElementRef;
  @ViewChild('posestAkt4') posestAkt4: ElementRef;

  @ViewChild('vodNakup') vodNakup: ElementRef;
  @ViewChild('posestNakup') posestNakup: ElementRef;

  @ViewChild('dobitnik') dobitnik: ElementRef;
  @ViewChild('zrtev') zrtev: ElementRef;
  

  @ViewChild('posestHisa') posestHisa: ElementRef;

  @ViewChild('posestPrenocitev') posestPrenocitev: ElementRef;
  @ViewChild('obiskovalec') obiskovalec: ElementRef;

  @ViewChild('piVod') piVod: ElementRef;
  @ViewChild('piZnesek') piZnesek: ElementRef;

  public posesti: Array<Posest>
  public vodi: Array<Vod>
  public aktivneOpozorilo: String = ""
  public nakupOpozorilo: String = ""
  public transOpozorilo: String = ""
  public hisaOpozorilo: String = ""
  public prenocitevOpozorilo: String = ""
  public piOpozorilo: String = ""

  public displayStyle = "none"
  
  constructor(private posestiService: PosestiPodatkiService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("moderator") != "tru3"){
      this.router.navigate(['/'])
      return
    }
    this.posestiService.getAllPosesti().subscribe((data) =>
    {
      this.posesti = data
    })
    this.posestiService.getAllVodi().subscribe((data) =>
    {
      this.vodi = data
    })
  }

  posljiNoveAktivne(){
    
    const vod = this.vodAkt.nativeElement.value
    const posest1 = this.posestAkt1.nativeElement.value
    const posest2 = this.posestAkt2.nativeElement.value
    const posest3 = this.posestAkt3.nativeElement.value
    const posest4 = this.posestAkt4.nativeElement.value
    if(vod == "" || posest1 == "" || posest2 == "" || posest3 == "" || posest4 == ""){
      this.aktivneOpozorilo = "Če hočeš poslati moraš izbrati 4 posesti!"
      return
    }
    this.posestiService.noveAktivnePosesti(vod, [posest1, posest2, posest3, posest4]).subscribe((data)=>{
      console.log(data)
      this.aktivneOpozorilo = "Vse kaže, da je šlo skozi!"
    })
  }

  izvediNakup(){
    const vodKupecId = this.vodNakup.nativeElement.value
    var posestId = this.posestNakup.nativeElement.value

    if(vodKupecId == "" || posestId == ""){
      this.nakupOpozorilo = "Če hočeš poslati moraš izbrati skupino in posesti!"
      return
    }


    var posest: Posest = this.posesti.filter(obj => {
      return obj._id.toString() === posestId
    })[0] as Posest

    var vodKupec: Vod = this.vodi.filter(obj => {
      return obj._id.toString() === vodKupecId
    })[0] as Vod

    if(vodKupec.denarnoStanje < posest.cena){
      this.nakupOpozorilo = "Kupec nima dovolj denarja!"
      return
    }

    if(posest.trenutniLastnik.id == "none"){
      console.log(vodKupecId, posestId)
      concat(
        this.posestiService.spremeniStanje(vodKupecId, -(posest.cena as number)),
        this.posestiService.addLastnaPosest(vodKupecId, posestId),
        this.posestiService.patchLastnik(posestId, vodKupecId),
        this.posestiService.dodajTransakcijo(vodKupecId, -(posest.cena as number) + ":Banka:" + posest.ime)
      ).subscribe({next: ()=>{this.nakupOpozorilo = "Uspešno!"}, error: ()=>{this.nakupOpozorilo = "Nekaj je šlo narobe!"}})
    }else{
      console.log(vodKupecId, posest.trenutniLastnik.id, posestId)
      concat(
        this.posestiService.spremeniStanje(vodKupecId, -(posest.cena as number)),
        this.posestiService.spremeniStanje(posest.trenutniLastnik.id, +(posest.cena as number)),
        this.posestiService.addLastnaPosest(vodKupecId, posestId),
        this.posestiService.removeLastnaPosest(posest.trenutniLastnik.id, posestId),
        this.posestiService.dodajTransakcijo(vodKupecId, -(posest.cena as number) + ":" + posest.trenutniLastnik.ime + ":" + posest.ime),
        this.posestiService.dodajTransakcijo(posest.trenutniLastnik.id, +(posest.cena as number) + ":" + vodKupec.ime + ":" + posest.ime),
        this.posestiService.patchLastnik(posestId, vodKupecId),
      ).subscribe({next: ()=>{this.nakupOpozorilo = "Uspešno!"}, error: ()=>{this.nakupOpozorilo = "Nekaj je šlo narobe!"}})
    }

  }

  izvediTransakcijo(){

    var dobitnikId = this.dobitnik.nativeElement.value
    var zrtevId = this.zrtev.nativeElement.value
    var znesek =5000

    if(dobitnikId=="" || zrtevId==""){
      console.log(znesek)
      this.transOpozorilo = "Izpolni vsa polja!"
      return
    }

    var zrtev: Vod = this.vodi.filter(obj => {
      return obj._id.toString() === zrtevId
    })[0] as Vod

    var dobitnik: Vod = this.vodi.filter(obj => {
      return obj._id.toString() === dobitnikId
    })[0] as Vod

    if(zrtev.denarnoStanje < (znesek as number)){
      this.transOpozorilo = "Nima dovolj denarja!"
      return
    }
    
    concat(
      this.posestiService.spremeniStanje(dobitnikId, +(znesek as number)),
      this.posestiService.spremeniStanje(zrtevId, -(znesek as number)),
      this.posestiService.dodajTransakcijo(dobitnikId, (znesek as number) + ":" + zrtev.ime + ": kraja"),
      this.posestiService.dodajTransakcijo(zrtevId, -(znesek as number) + ":" + dobitnik.ime + ": kraja")
    ).subscribe({next: ()=>{this.transOpozorilo = "Uspešno!"}, error: ()=>{this.transOpozorilo = "Nekaj je šlo narobe!"}})
  }

  dodajHiso(){
    var hisaId = this.posestHisa.nativeElement.value
    var cena = 0

    if(hisaId == ""){
      this.hisaOpozorilo = "Izberi posest!"
    }
    var posest: Posest = this.posesti.filter(obj => {
      return obj._id.toString() === hisaId
    })[0] as Posest

    if(posest.trenutniLastnik.id == "none"){
      this.hisaOpozorilo = "Posest nima lastnika!"
      return
    }

    if(posest.hise > 3){
      this.hisaOpozorilo = "Posest ima že hotel!"
      return
    }else if(posest.hise == 3){
      cena = 30000
    }else if(posest.hise == 3){
      cena = 20000
    }else if(posest.hise == 2){
      cena = 10000
    }else{
      cena=5000
    }
    concat(
      this.posestiService.dodajHiso(hisaId),
      this.posestiService.spremeniStanje(posest.trenutniLastnik.id, -cena),
      this.posestiService.dodajTransakcijo(posest.trenutniLastnik.id, -cena + ":Banka:" + posest.ime+ " hiša"),
    ).subscribe({next: ()=>{this.hisaOpozorilo = "Uspešno!"}, error: ()=>{this.hisaOpozorilo = "Nekaj je šlo narobe!"}})
  }

  odstraniHiso(){
    var hisaId = this.posestHisa.nativeElement.value
    var cena = 0
    if(hisaId == ""){
      this.hisaOpozorilo = "Izberi posest!"
    }
    var posest: Posest = this.posesti.filter(obj => {
      return obj._id.toString() === hisaId
    })[0] as Posest

    if(posest.trenutniLastnik.id == "none"){
      this.hisaOpozorilo = "Posest nima lastnika!"
      return
    }
    
    if(posest.hise < 1){
      this.hisaOpozorilo = "Posest nima hiš!"
      return
    }else if(posest.hise < 4){
      cena = 5000
    }else if(posest.hise == 4){
      cena = 15000
    }
    
    concat(
      this.posestiService.odstraniHiso(hisaId),
      this.posestiService.spremeniStanje(posest.trenutniLastnik.id, cena),
      this.posestiService.dodajTransakcijo(posest.trenutniLastnik.id, cena + ":Banka:" + posest.ime+ " prodaja hiše")
    ).subscribe({next: ()=>{this.hisaOpozorilo = "Uspešno!"}, error: ()=>{this.hisaOpozorilo = "Nekaj je šlo narobe!"}})
  }

  izvediPrenocitev(){

    var obiskovalecId = this.obiskovalec.nativeElement.value
    var posestId = this.posestPrenocitev.nativeElement.value
    

    if(obiskovalecId=="" || posestId==""){
      this.prenocitevOpozorilo = "Izpolni vsa polja!"
      return
    }

    var obiskovalec: Vod = this.vodi.filter(obj => {
      return obj._id.toString() === obiskovalecId
    })[0] as Vod

    var posest: Posest = this.posesti.filter(obj => {
      return obj._id.toString() === posestId
    })[0] as Posest

    var znesek = (posest.cena as number)/10

    if(obiskovalec.denarnoStanje < znesek){
      this.prenocitevOpozorilo = "Nima dovolj denarja!"
      return
    }
    
    concat(
      this.posestiService.spremeniStanje(obiskovalecId, -(znesek as number)),
      this.posestiService.spremeniStanje(posest.trenutniLastnik.id, +(znesek as number)),
      this.posestiService.dodajTransakcijo(posest.trenutniLastnik.id, (znesek as number) + ":" + obiskovalec.ime + ": obisk"),
      this.posestiService.dodajTransakcijo(obiskovalecId, -(znesek as number) + ":" + posest.trenutniLastnik.ime + ": obisk")
    ).subscribe({next: ()=>{this.prenocitevOpozorilo = "Uspešno!"}, error: ()=>{this.prenocitevOpozorilo = "Nekaj je šlo narobe!"}})
  }

  priloznost(){
    var vodId = this.piVod.nativeElement.value
    var znesek = this.piZnesek.nativeElement.value

    if(vodId=="" || znesek==""){
      this.piOpozorilo = "Izpolni vsa polja!"
      return
    }

    concat(
      this.posestiService.spremeniStanje(vodId, +(znesek as number)),
      this.posestiService.dodajTransakcijo(vodId, +(znesek as number) + ":Banka: priložnost")
    ).subscribe({next: ()=>{this.piOpozorilo = "Uspešno!"}, error: ()=>{this.piOpozorilo = "Nekaj je šlo narobe!"}})

  }

  izziv(){
    var vodId = this.piVod.nativeElement.value
    var znesek = this.piZnesek.nativeElement.value

    if(vodId=="" || znesek==""){
      this.piOpozorilo = "Izpolni vsa polja!"
      return
    }

    var vod: Vod = this.vodi.filter(obj => {
      return obj._id.toString() === vodId
    })[0] as Vod

    if(vod.denarnoStanje < (znesek as number)){
      this.piOpozorilo = "Nima dovolj denarja!"
      return
    }

    concat(
      this.posestiService.spremeniStanje(vodId, -(znesek as number)),
      this.posestiService.dodajTransakcijo(vodId, -(znesek as number) + ":Banka: izziv")
    ).subscribe({next: ()=>{this.piOpozorilo = "Uspešno!"}, error: ()=>{this.piOpozorilo = "Nekaj je šlo narobe!"}})
  }

  reload(){
    location.reload()
  }

  openModal(){
    this.displayStyle = "block"
  }
}
