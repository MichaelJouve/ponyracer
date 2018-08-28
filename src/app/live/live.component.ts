import { Component, OnInit, OnDestroy } from '@angular/core';
import { RaceService } from '../race.service';
import { ActivatedRoute } from '@angular/router';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {

  raceModel: RaceModel;
  poniesWithPosition: Array<PonyWithPositionModel>;
  positionSubscription: Subscription;


  constructor(private raceService: RaceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('raceId');
    this.raceService.get(id).
      subscribe(race => this.raceModel = race);
    this.positionSubscription = this.raceService.live(id).subscribe((poniesPositions) => this.poniesWithPosition = poniesPositions);
  }

  ngOnDestroy(): void {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }

}
