import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { MovieService } from '../../core/services/movie.service';
import { ScheduleService } from '../../core/services/schedule.service';
import { RoomService } from '../../core/services/room.service';
import { Movie } from '../../core/models/movie.model';
import { Room } from '../../core/models/room.model';
import { Schedule } from '../../core/models/schedule.model';
import moment from 'moment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private movieService: MovieService,
    private roomService: RoomService,
    private scheduleService: ScheduleService
  ) {}

  scheduleDetails: { schedule: Schedule, movie: Movie, room: Room }[] = [];

  ngOnInit() {
    this.loadSchedules(moment().week());
  }

  openModal() {
    alert('Prenotato! ...o almeno cosi dovrebbe essere se esistesse la funzionalità 😥');
  }

  loadSchedules(week: number){
    this.scheduleService.getSchedulesByDate(moment().week(week).format('YYYY-MM-DD')).subscribe(schedules => {
      schedules.forEach(schedule => {
        this.loadMovieAndRoom(schedule);
      });
    });
  }

  loadMovieAndRoom(schedule: Schedule){
    let movie: Movie;
    let room: Room;

    this.movieService.getMovieById(schedule.movieId!).subscribe(movieData => {
      movie = movieData;
      this.roomService.getRoomById(schedule.roomId!).subscribe(roomData => {
        room = roomData;
        this.scheduleDetails.push({ schedule, movie, room });
      });
    });
  }
}
