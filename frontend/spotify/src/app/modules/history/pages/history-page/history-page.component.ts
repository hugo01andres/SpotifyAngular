import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent {
  tracksList$:  Observable<any> = of([]);
  constructor(private searchService: SearchService) { }

  receiveData(event: string): void{
    this.tracksList$ = this.searchService.searchTracks$(event)
    
  }
}
