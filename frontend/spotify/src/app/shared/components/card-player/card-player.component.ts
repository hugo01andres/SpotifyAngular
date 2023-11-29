import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrl: './card-player.component.css'
})
export class CardPlayerComponent  implements OnInit{
  @Input() mode: 'small' | 'big' = 'small';
  @Input() track!: TrackModel;
  constructor(private _multimediaService: MultimediaService) { }
  ngOnInit(): void {
    
  }
  sendPlay(track: TrackModel){
    this._multimediaService.trackInfo$.next(track);
  }

}
