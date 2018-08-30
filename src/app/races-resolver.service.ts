import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RaceService } from './race.service';

@Injectable({
  providedIn: 'root'
})
export class RacesResolverService implements Resolve<Array<RaceModel>> {

  constructor(private raceService: RaceService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Array<RaceModel>> {
    const status = route.routeConfig.path.toUpperCase();
    return this.raceService.list(status);
  }

}
