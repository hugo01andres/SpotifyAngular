import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.css'
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  
  mockCover!: TrackModel;
  listObservers$: Array<Subscription> = [];

  constructor(public multimediaService: MultimediaService) { }


  ngOnInit(): void {

    this.multimediaService.trackInfo$.subscribe( res =>{
      console.log('Reproducir:');
    })
    
  }


  ngOnDestroy(): void {
    console.log('Destruyendo el reproductor');

    this.listObservers$.forEach(u => u.unsubscribe() );
  }

}
