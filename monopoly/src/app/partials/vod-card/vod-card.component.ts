import { Component, OnInit, Input } from '@angular/core';
import { Vod } from 'src/app/classes/vodi';
@Component({
  selector: 'app-vod-card',
  templateUrl: './vod-card.component.html',
  styleUrls: ['./vod-card.component.css']
})
export class VodCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() vod: Vod;
}
