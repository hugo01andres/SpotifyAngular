import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter();

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public audio : HTMLAudioElement = new Audio();
  constructor() {
    this.audio = new Audio();
    this.trackInfo$.subscribe((responseOk) => {
      if(responseOk)
      {
        this.setAudio(responseOk);
      }
    }
    );
    this.listenAllEvents();
   }

   public listenAllEvents(): void{
      this.audio.addEventListener('timeupdate',this.calculateTime, false)

   }

   private calculateTime = () =>{
     console.log('Disparando evento');
     const {duration, currentTime} = this.audio;
     console.table([duration, currentTime]);
     
     
   }

  public setAudio(track: TrackModel) : void
  {
      this.audio.src = track.url;
      this.audio.play();
  }


}
