import { Component, OnInit, Input } from '@angular/core';
import { Posest } from 'src/app/classes/posesti';
import { PosestiPodatkiService } from 'src/app/services/podatki.service';


@Component({
  selector: 'app-posest-card',
  templateUrl: './posest-card.component.html',
  styleUrls: ['./posest-card.component.css']
})
export class PosestCardComponent implements OnInit {
  constructor(private podatkiService: PosestiPodatkiService) { }

  
  ngOnInit(): void {
  }

  @Input() posest: Posest;

  getVodIme(id: String){
    this.podatkiService.getVod(id).subscribe((data) =>
    {
      return data.ime
    })
  }

  getPosestSrc(){
    var src="../../../assets/slike/"
    var ime = this.posest.ime
    ime = ime.toLowerCase().split(' ').join('-')
    return src+ime+".jpg"
  }
}
