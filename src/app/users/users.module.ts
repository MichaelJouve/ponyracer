import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { USERS_ROUTES } from './users.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(USERS_ROUTES),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
  ]
})
export class UsersModule { }
