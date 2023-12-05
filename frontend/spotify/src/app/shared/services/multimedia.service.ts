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
  public timeElapsed$ : BehaviorSubject<string> = new BehaviorSubject<string>('00:00');
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
     this.setTimeElapsed(currentTime);
   }
   private setTimeElapsed(time: number): void{
    // 5.1, 8.2
    let seconds = Math.floor(time % 60);
    let minutes = Math.floor(time / 60) % 60;

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;

    const elapsedTime = `${displayMinutes}:${displaySeconds}`;
    this.timeElapsed$.next(elapsedTime);
  }

  public setAudio(track: TrackModel) : void
  {
      this.audio.src = track.url;
      this.audio.play();
  }


}
