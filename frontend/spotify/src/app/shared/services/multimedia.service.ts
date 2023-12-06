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
  public timeRemaining$ : BehaviorSubject<string> = new BehaviorSubject<string>('00:00');
  public playerStatus$ : BehaviorSubject<string> = new BehaviorSubject<string>('paused');
  public playerPercentage$ : BehaviorSubject<number> = new BehaviorSubject<number>(0);

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
      this.audio.addEventListener('playing',this.setPlayerStatus, false)
      this.audio.addEventListener('play',this.setPlayerStatus, false)
      this.audio.addEventListener('pause',this.setPlayerStatus, false)
      this.audio.addEventListener('ended',this.setPlayerStatus, false)

   }
   private setPlayerStatus = (state: any) =>{
      console.log('stated');
      switch(state.type){
        case 'playing':
          this.playerStatus$.next('playing');
          break;
        case 'play':
          this.playerStatus$.next('play');
          break;
        case 'pause':
          this.playerStatus$.next('paused');
          break;
        case 'ended':
          this.playerStatus$.next('ended');
          break;
        default:
          this.playerStatus$.next('paused');
          break;
      }
      
    }
    public togglePlayer(): void {
      (this.audio.paused) ? this.audio.play() : this.audio.pause();
    }

   private calculateTime = () =>{
     const {duration, currentTime} = this.audio;
     this.setTimeElapsed(currentTime);
     this.setTimeRemaining(currentTime, duration);
      this.setPercentage(currentTime, duration);
   }

   private setPercentage(currentTime: number, duration: number): void{
    // 5.1, 8.2
    let percentage = (currentTime / duration) * 100;
    this.playerPercentage$.next(percentage);
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

  private setTimeRemaining(time: number, duration: number): void{
    // 5.1, 8.2
    let timeLeft = duration - time;
    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor(timeLeft / 60) % 60;

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;

    const remainingTime = `-${displayMinutes}:${displaySeconds}`;

    this.timeRemaining$.next(remainingTime);
  }

  public setAudio(track: TrackModel) : void
  {
      this.audio.src = track.url;
      this.audio.play();
  }


}
