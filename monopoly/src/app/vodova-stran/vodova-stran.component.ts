import { Component, OnInit } from '@angular/core';
import { PosestiPodatkiService } from '../services/podatki.service';
import { Posest } from '../classes/posesti';
import { Router } from '@angular/router';
import { Vod } from '../classes/vodi';
import { TransakcijaTextPipe } from '../pipes/transakcija-text.pipe';
@Component({
  selector: 'app-vodova-stran',
  templateUrl: './vodova-stran.component.html',
  styleUrls: ['./vodova-stran.component.css']
})
export class VodovaStranComponent implements OnInit {
  constructor(private posestiService: PosestiPodatkiService, private router: Router) { }
  
  public prvaPosest: Posest = new Posest("Ni podatkov")
  public aktivnePosesti: Posest[] = []

  public prvaLastna: Posest = new Posest("Ni podatkov")
  public lastnePosesti: Posest[] = []

  public ostaliVodi: Vod[]
  public vod: Vod

  ngOnInit(): void {
    if(localStorage.getItem("skupinaId") == null){
      this.router.navigate(['/prijava'])
    }

    this.posestiService.getAktivne(localStorage.getItem("skupinaId") as String).subscribe((data)=>{
      this.prvaPosest = data[0]
      this.aktivnePosesti = data.slice(1)
    })

    this.posestiService.getAllVodi().subscribe((data)=>{
      this.ostaliVodi = data.filter(obj => {
        return obj._id.toString() != localStorage.getItem("skupinaId") 
      }) as Vod[]

      this.vod = data.filter(obj => {
        return obj._id.toString() === localStorage.getItem("skupinaId") 
      })[0] as Vod
    })

    this.posestiService.getAllPosesti().subscribe((data)=>{
      let ids = this.aktivnePosesti.map(a => a._id);
      this.aktivnePosesti = data.filter(obj => {
        return ids.includes(obj._id)
      }) as Posest[]
      this.prvaPosest = data.filter(obj => {return obj._id === this.prvaPosest._id})[0]
      
      ids = this.vod.lastnePosesti.map(a => a._id);
      this.vod.lastnePosesti = data.filter(obj => {
        return ids.includes(obj._id)
      }) as [Posest]
      
      this.prvaLastna = this.vod.lastnePosesti[0]
      this.lastnePosesti = this.vod.lastnePosesti.slice(1)
    })

    
  }
  
  odjava(){
    localStorage.removeItem('skupinaIme')
    localStorage.removeItem('skupinaId')
    location.reload()
  }

}
