import { fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, convertToParamMap, Params, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';

import { RaceResolverService } from './race-resolver.service';
import { RaceService } from './race.service';
import { RaceModel } from './models/race.model';
import { AppModule } from './app.module';
import { LoggedInGuard } from './logged-in.guard';
import { AppComponent } from './app.component';

describe('RaceResolverService', () => {
  let appComponentFixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule
      ]
    });

    const loggedInGuard: LoggedInGuard = TestBed.get(LoggedInGuard);
    spyOn(loggedInGuard, 'canActivate').and.returnValue(true);

    appComponentFixture = TestBed.createComponent(AppComponent);
    appComponentFixture.detectChanges();
  });

  it('should resolve race using the raceId route parameter', () => {
    const raceService: RaceService = TestBed.get(RaceService);
    const expectedResult: Observable<RaceModel> = EMPTY;

    spyOn(raceService, 'get').and.returnValue(expectedResult);

    const resolver: RaceResolverService = TestBed.get(RaceResolverService);

    const params = { raceId: '42' } as Params;
    const paramMap = convertToParamMap(params);

    const routeSnapshot = { params, paramMap } as ActivatedRouteSnapshot;
    const result = resolver.resolve(routeSnapshot, undefined);

    expect(result).toBe(expectedResult, 'The resolver should call return a race');
    expect(+(raceService.get as jasmine.Spy).calls.argsFor(0)[0])
      .toBe(42, 'The resolver should call the RaceService.get method with the id');
  });

  it('should be applied on the bet route', fakeAsync(() => {
    const resolver: RaceResolverService = TestBed.get(RaceResolverService);
    spyOn(resolver, 'resolve').and.returnValue(of({ id: 42 }));

    const router: Router = TestBed.get(Router);
    router.navigateByUrl('/races/42');

    tick();
    appComponentFixture.detectChanges();
    expect(resolver.resolve).toHaveBeenCalled();
  }));

  it('should be applied on the live route', fakeAsync(() => {
    const resolver: RaceResolverService = TestBed.get(RaceResolverService);
    spyOn(resolver, 'resolve').and.returnValue(of({ id: 42 }));
    const raceService: RaceService = TestBed.get(RaceService);
    spyOn(raceService, 'live').and.returnValue(of([]));

    const router: Router = TestBed.get(Router);
    router.navigateByUrl('/races/42/live');

    tick();
    appComponentFixture.detectChanges();
    expect(resolver.resolve).toHaveBeenCalled();
  }));
});
