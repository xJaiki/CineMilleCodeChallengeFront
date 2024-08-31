import { Component } from '@angular/core';
import { Room } from '../../core/models/room.model';
import { RoomService } from '../../core/services/room.service';


@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrl: './room-management.component.css'
})
export class RoomManagementComponent {
  rooms: Room[] = [];

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.loadMovies();
  }
  loadMovies(): void {
    this.roomService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
    });
    
  }

}
