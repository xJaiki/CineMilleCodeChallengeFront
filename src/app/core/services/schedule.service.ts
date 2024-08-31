import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from '../models/schedule.model';
import { ScheduleWithDetailsModel } from '../models/schedule-with-details.model';
import { environment } from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiUrl = `${environment.apiUrl}/schedule`;

  constructor(private http: HttpClient) {}

  addSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.apiUrl, schedule);
  }

  getSchedulesByDate(date: string): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiUrl}/date/${date}`);
  }

  getSchedulesForYear(year: number): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiUrl}/year/${year}`);
  }

  getSchedulesForYearFromThisWeek(year: number): Observable<ScheduleWithDetailsModel[]> {
    return this.http.get<ScheduleWithDetailsModel[]>(`${this.apiUrl}/year/fromthisweek/${year}`);
  }
}
