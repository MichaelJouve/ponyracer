import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { WsService } from './ws.service';
import { RaceModel, LiveRaceModel } from './models/race.model';
import { PonyWithPositionModel } from './models/pony.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient, private wsService: WsService) {}

  list(status: string): Observable<Array<RaceModel>> {
    const params = { status: status };
    return this.http.get<Array<RaceModel>>(`${environment.baseUrl}/api/races`, { params });
  }

  get(raceId: number): Observable<RaceModel> {
    return this.http.get<RaceModel>(`${environment.baseUrl}/api/races/${raceId}`);
  }

  bet(raceId: number, ponyId: number): Observable<RaceModel> {
    return this.http.post<RaceModel>(`${environment.baseUrl}/api/races/${raceId}/bets`, { ponyId });
  }

  cancelBet(raceId: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/api/races/${raceId}/bets`);
  }

  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    return this.wsService.connect<LiveRaceModel>(`/race/${raceId}`).pipe(
      takeWhile(liveRace => liveRace.status !== 'FINISHED'),
      map(liveRace => liveRace.ponies)
    );
  }

  boost(raceId: number, ponyId: number) {
    return this.http.post(`${environment.baseUrl}/api/races/${raceId}/boosts`, { ponyId });
  }

}
