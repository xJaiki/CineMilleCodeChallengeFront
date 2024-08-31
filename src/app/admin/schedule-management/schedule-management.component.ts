import { Component } from '@angular/core';
import moment from 'moment';
import { MovieService } from '../../core/services/movie.service';
import { RoomService } from '../../core/services/room.service';
import { ScheduleService } from '../../core/services/schedule.service';
import { Movie } from '../../core/models/movie.model';
import { Room } from '../../core/models/room.model';
import { Schedule } from '../../core/models/schedule.model';

@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrl: './schedule-management.component.css'
})
export class ScheduleManagementComponent {

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

  //(change)="onChangeYear($event.target.value)"
  onChangeYear(year: number) {
    this.selectYear = year;
    this.weeks = [];
    this.generateWeeks(year);
  }

  generateWeeks(yearInput: number = moment().year()) {
    const year = yearInput;
    const startOfYear = moment().year(year).startOf('year');
    const endOfYear = moment().year(year).endOf('year');

    let currentWeek = startOfYear;
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

    this.scheduleService.getSchedulesForYear(year).subscribe((scheduleData) => {
        scheduleData.forEach(schedule => {
            const week = weeks.find(w => moment(schedule.startDate).isoWeek() === w.weekNumber);
            if (week) {
                week.movies.push({
                    movie: this.movies.find(m => m.id === schedule.movieId),
                    room: this.rooms.find(r => r.id === schedule.roomId),
                    startDate: schedule.startDate,
                    endDate: schedule.endDate,
                });
            }
        });
        this.weeks = weeks;
    });
}

openModal(modal: string, week: any) {
  if (modal === 'addMovie') {
      this.selectedWeek = week; 
      this.startDate = week.startDate;  
      this.endDate = week.endDate;  
      
      if (!this.rooms.length) {
          this.roomService.getAvailableRooms(this.startDate).subscribe(rooms => {
              this.rooms = rooms;
          });
      }
      
      this.isAddMovieModal = true;
  } else {
      this.isViewInfoModal = true;
  }
}

  closeModal(modal: string) {
    if (modal === 'addMovie') {
      this.isAddMovieModal = false;
    } else {
      this.isViewInfoModal = false;
    }
  }

  onSubmit() {
    let selectedMovie = parseInt(this.selectedMovie);
    let selectedRoom = parseInt(this.selectedRoom);
    let startDate = this.startDate.split('/').reverse().join('-');
    let endDate = this.endDate.split('/').reverse().join('-');

    const schedule: Schedule = {
      movieId: selectedMovie,
      roomId: selectedRoom,
      startDate: startDate,
      endDate: endDate
    };
   
    this.scheduleService.addSchedule(schedule).subscribe(() => {
      this.isAddMovieModal = false;
      this.generateWeeks();
    }).add(() => {
      this.errorMessage = 'Errore durante l\'aggiunta dello spettacolo';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    });
  }

  generateWeekColor(startDate: string): any {
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


  viewDetails(week: any) {
    this.selectedWeek = week;
    this.weekMovies = week.movies;
    this.isViewInfoModal = true;

  }
}
