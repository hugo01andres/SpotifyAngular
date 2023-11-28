import { Injectable } from '@angular/core';
import { Observable, map, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TrackModel } from '@core/models/tracks.model';
@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;



  constructor(private httpClient: HttpClient) { 
    
  }

  private skipById(listTracks: TrackModel[], id: number):Promise<TrackModel[]>{
    return new Promise((resolve, reject) => {
      const listTemp = listTracks.filter((track: TrackModel) => track._id != id)
      resolve(listTemp)
    })
  }

  /**
   * 
   * @returns Devolver tracks
   */
  getAllTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
    .pipe(
      map((dataRaw:any) => {
        return dataRaw.data
      })
    )
  }

  /**
   *  {data} es lo mismo que poner dataRaw, solo que aqui lo mapeamos mas limpio
   * @returns Devolver tracks aleatoriosy alrevez
   */
  getAllRandom$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
    .pipe(
      //NOTE: Utilizamos la promesa paa hacer la lista sin el id 1
      mergeMap(({ data }: any) => this.skipById(data,1)),

      //NOTE: APLICAR FILTER que sean todas las canciones excepto la de id 1
      // map((dataRevertida) =>{
      //   return dataRevertida.filter((track: TrackModel) => track._id != 1)
      // })
    )
  }

}
