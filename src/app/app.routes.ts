
import { HomeComponent } from './home/home.component';
import { RacesComponent } from './races/races.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';
import { BetComponent } from './bet/bet.component';
import { LiveComponent } from './live/live.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'races', component: RacesComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'races',
    children: [
      { path: ':raceId', component: BetComponent },
      { path: 'live/:raceId', component: LiveComponent },
      { path: '', component: RacesComponent }
    ]
  }
];
