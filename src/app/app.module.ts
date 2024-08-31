import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BootstrapTableColumn } from 'bootstrap-table';
import { CommonModule } from '@angular/common';
import { MovieManagementComponent } from './admin/movie-management/movie-management.component';
import { ScheduleManagementComponent } from './admin/schedule-management/schedule-management.component';
import { RoomManagementComponent } from './admin/room-management/room-management.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { ScheduleComponent } from './user/schedule/schedule.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    MovieManagementComponent,
    ScheduleManagementComponent,
    RoomManagementComponent,
    UserManagementComponent,
    ScheduleComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class
 AppModule { }
