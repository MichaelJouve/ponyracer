
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { Routes } from '@angular/router';
import { LoggedInGuard } from './logged-in.guard';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'races',
    canActivate: [LoggedInGuard],
    loadChildren: './races/races.module#RacesModule'
    
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
