import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ScheduleComponent } from './user/schedule/schedule.component';

import { MovieManagementComponent } from './admin/movie-management/movie-management.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { ScheduleManagementComponent } from './admin/schedule-management/schedule-management.component';
import { RoomManagementComponent } from './admin/room-management/room-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, //NOTE - dashboard con i film di questa settimana, eventuali prenotazioni
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, //NOTE - pagina per la modifica del profilo
  { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] }, //NOTE - lista dei film in programmazione e possibilità di prenotare

  { path: 'movie-management', component: MovieManagementComponent, canActivate: [AdminGuard] },
  { path: 'user-management', component: UserManagementComponent, canActivate: [AdminGuard]},
  { path: 'schedule-management', component: ScheduleManagementComponent, canActivate: [AdminGuard] },
  { path: 'room-management', component: RoomManagementComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
