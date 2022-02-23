import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Posest } from '../classes/posesti';
import { Vod } from '../classes/vodi';

@Injectable({
  providedIn: 'root'
})
export class PosestiPodatkiService {

  private uri = "http://localhost:3000/"
  constructor(private http: HttpClient) { }

  getAllPosesti(){
    return this.http.get<Posest[]>(this.uri+"posesti")
  }

  getAllVodi(){
    return this.http.get<Vod[]>(this.uri+"vodi")
  }

  getVod(id: String){
    return this.http.get<Vod>(this.uri+"vodi/"+id)
  }

  noveAktivnePosesti(vodId: String, noveAtivne: String[]){
    const body = {"noveAktivne": noveAtivne}
    return this.http.patch<Vod[]>(this.uri+"vodi/aktivne/"+vodId, body)
  }

  patchLastnik(posestId: String, novLastnikId: String){
    const body = {"novLastnikId": novLastnikId}
    return this.http.patch<Posest>(this.uri+"posesti/lastnik/"+posestId, body)
  }

  addLastnaPosest(vodId: String, posestId: String){
    const body = {"posestId": posestId}
    return this.http.put<Vod>(this.uri+"vodi/lastna/"+vodId, body)
  }

  removeLastnaPosest(vodId: String, posestId: String){
    const body = {"posestId": posestId}
    return this.http.patch<Vod>(this.uri+"vodi/lastna/"+vodId, body)
  }

  spremeniStanje(vodId: String, novoStanje: number){
    const body = {"stanje": novoStanje}
    return this.http.patch<Vod>(this.uri+"vodi/stanje/"+vodId, body)
  }

  dodajHiso(posestId: String){
    return this.http.put<Vod>(this.uri+"posesti/hisa/"+posestId, {})
  }

  odstraniHiso(posestId: String){
    return this.http.delete<Vod>(this.uri+"posesti/hisa/"+posestId)
  }

  authVod(ime: String, geslo: String){
    var body = {"geslo": geslo}
    return this.http.post<Vod>(this.uri+"vodi/"+ime, body)
  }

  getAktivne(id: String){
    return this.http.get<Posest[]>(this.uri+"vodi/aktivne/"+id)
  }

  dodajTransakcijo(id: String, transakcija: String){
    var body = {"transakcija": transakcija}
    return this.http.put<Vod>(this.uri+"vodi/trans/"+id, body)
  }

  wipe(){
    return this.http.get(this.uri+"dbapi/wipe")
  }

  fill(){
    return this.http.get(this.uri+"dbapi/fill")
  }

}
