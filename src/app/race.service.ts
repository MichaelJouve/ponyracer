import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { RaceModel, LiveRaceModel } from './models/race.model';
import { PonyWithPositionModel } from './models/pony.model';
import { WsService } from './ws.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient, private wsService: WsService) {}

  list(): Observable<Array<RaceModel>> {
    const params = { status: 'PENDING' };
    return this.http.get<Array<RaceModel>>(`${environment.baseUrl}/api/races`, { params });
  }

  bet(raceId: number, ponyId: number):Observable<RaceModel> {
   return this.http.post<RaceModel>(`${environment.baseUrl}/api/races/${raceId}/bets`, ponyId);
  }

  get(id:number):Observable<RaceModel> {
   return this.http.get<RaceModel>(`${environment.baseUrl}/api/races/${id}`);
  }

  cancelBet(raceId:number):Observable<void> {
   return this.http.delete<void>(`${environment.baseUrl}/api/races/${raceId}/bets`);
  }

  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    return this.wsService.connect<LiveRaceModel>('/race/' + raceId).pipe(
      map(liveRace => liveRace.ponies)
    );
  }

}
