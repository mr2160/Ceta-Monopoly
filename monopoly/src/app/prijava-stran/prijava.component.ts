import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { PosestiPodatkiService } from '../services/podatki.service';
import { Router, RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private podatkiService: PosestiPodatkiService, private router: Router) { }

  @ViewChild('uporabniskoime') uporabniskoime: ElementRef;
  @ViewChild('geslo') geslo: ElementRef;

  public opozorilo = ""
  ngOnInit(): void {
  }

  posljiPrijavo(){
    var uporabniskoime = this.uporabniskoime.nativeElement.value
    var geslo = this.geslo.nativeElement.value

    if(uporabniskoime == "" || geslo == ""){
      return
    }
    if(uporabniskoime == "moderator" && geslo == "Delf1ncek"){
      localStorage.setItem('moderator', 'tru3')
      this.router.navigate(['/moderator'])
      return
    }
    console.log(uporabniskoime, geslo)
    this.podatkiService.authVod(uporabniskoime, geslo).subscribe((data) => {
      localStorage.setItem('skupinaId', data._id as string)
      localStorage.setItem('skupinaIme', data.ime as string)
      this.router.navigate(['/'])
    }, (err)=>{
      console.log(err)
      this.opozorilo = err.message
    })
  }
}
