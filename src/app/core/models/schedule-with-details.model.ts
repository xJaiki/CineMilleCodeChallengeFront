export class ScheduleWithDetailsModel {
    scheduleId?: number;
    startDate?: Date;
    endDate?: Date;
    movie?: MovieModel;
    room?: RoomModel;
}

class MovieModel {
    movieId?: number;
    title?: string;
    year?: number;
    runtime?: number;
    genres?: string;
    director?: string;
    actors?: string;
    plot?: string;
    posterUrl?: string;
}

class RoomModel {
    roomId?: number;
    name?: string;
    capacity?: number;
    isIMAX?: boolean;
}