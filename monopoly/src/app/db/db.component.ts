import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PosestiPodatkiService } from '../services/podatki.service';

@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.css']
})
export class DbComponent implements OnInit {
  public opozorilo: string
  constructor(private router: Router, private podatki: PosestiPodatkiService) { }

  ngOnInit(): void {
    if(localStorage.getItem('moderator') != 'tru3'){
      this.router.navigate(['/'])
      return
    }
  }

  wipe(){
    this.podatki.wipe().subscribe({next: ()=>{this.opozorilo = "Uspešno izbrisano!"}, error: ()=>{this.opozorilo = "Nekaj je šlo narobe!"}})
  }

  fill(){
    this.podatki.fill().subscribe({next: ()=>{this.opozorilo = "Uspešno napolnjeno!"}, error: (e)=>{this.opozorilo = "Nekaj je šlo narobe!";console.log(e)}})
  }
}
