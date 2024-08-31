import { Component } from '@angular/core';

import moment from 'moment';
import { MovieService } from '../../core/services/movie.service';
import { RoomService } from '../../core/services/room.service';
import { ScheduleService } from '../../core/services/schedule.service';
import { Movie } from '../../core/models/movie.model';
import { Room } from '../../core/models/room.model';
import { Schedule } from '../../core/models/schedule.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {

  constructor(private movieService: MovieService, private roomService: RoomService, private scheduleService: ScheduleService) {}

  weeks: any[] = [];
  movies: Movie[] = [];
  rooms: Room[] = [];
  selectedWeek: any;
  selectedMovie: any;
  selectedRoom: any;
  selectYear: number = moment().year();
  years: number[] = Array.from({ length: 21 }, (_, i) => moment().year() - 10 + i);

  weekSchedule: Schedule[] = [];
  weekMovies: Movie[] = [];

  startDate: string = '';
  endDate: string = '';

  errorMessage: string = '';

  isAddMovieModal: boolean = false;
  isViewInfoModal: boolean = false;

  ngOnInit() {
    this.generateWeeks();
    this.loadMovies();
    this.loadRooms();
    this.scrollToCurrentWeek();
  }

  scrollToCurrentWeek() {
  }

  loadMovies(){
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
  }

  loadRooms(){
    this.roomService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  isCurrentWeek(startDate: any): boolean {
    return moment(startDate, 'DD/MM/YYYY').isSame(moment(), 'week');
  }

  //(change)="onChangeYear($event.target.value)"
  onChangeYear(year: number) {
    this.selectYear = year;
    this.weeks = [];
    this.generateWeeks();
  }

  
  generateWeeks() {
    const year = this.selectYear;
    const today = moment();
    const endOfYear = moment().year(year).endOf('year');
  
    let currentWeek = today;
  
    const weeks: any[] = [];
    while (currentWeek <= endOfYear) {
      weeks.push({
        weekNumber: currentWeek.isoWeek(),
        startDate: currentWeek.clone().startOf('isoWeek').format('DD/MM/YYYY'),
        endDate: currentWeek.clone().endOf('isoWeek').format('DD/MM/YYYY'),
        movies: [],
      });
      currentWeek.add(1, 'week');
    }
  
    this.scheduleService.getSchedulesForYearFromThisWeek(year).subscribe(scheduleDtos => {
      scheduleDtos.forEach(schedule => {
        const scheduleWeekNumber = moment(schedule.startDate).isoWeek();
        const week = weeks.find(w => w.weekNumber === scheduleWeekNumber);
        if (week) {
          week.movies.push({
            title: schedule.movie?.title,
            room: schedule.room?.name,
            startDate: schedule.startDate,
            endDate: schedule.endDate,

          });
        }
      });
      this.weeks = weeks;
    });
  }
  generateWeekColor(startDate: string): any {
    // generate a hex color based on the month name
    const month = moment(startDate, 'DD/MM/YYYY').format('MMMM');
    let hash = 0;
    for (let i = 0; i < month.length; i++) {
      hash = month.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }
}
