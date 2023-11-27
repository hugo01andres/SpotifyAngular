import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;



  constructor(private httpClient: HttpClient) { 
    
  }

  getAllTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
    .pipe(
      map((dataRaw:any) => {
        return dataRaw.data
      })
    )
  }
}
