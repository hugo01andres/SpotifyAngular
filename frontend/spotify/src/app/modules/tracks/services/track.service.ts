import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import * as dataRaw from '../../../data/tracks.json'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;



  constructor(private httpClient: HttpClient) { 
    
  }

  getAllTracks$(): Observable<Array<TrackModel>> {
    return this.httpClient.get<Array<TrackModel>>(`${this.URL}/tracks`)
  }
}
