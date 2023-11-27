import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import * as dataRaw from '../../../data/tracks.json'
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TrackService {


  constructor(private httpClient: HttpClient) { 
    
  }

  getAllTracks$(): Observable<Array<TrackModel>> {
    const data = (dataRaw as any).default
    return of(data)
  }
}
