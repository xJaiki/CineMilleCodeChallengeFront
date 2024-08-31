import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../core/models/movie.model';

@Component({
  selector: 'app-movie-management',
  templateUrl: './movie-management.component.html',
  styleUrls: ['./movie-management.component.css'],
})
export class MovieManagementComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchTerm: string = '';
  currentMovie: Movie = new Movie();
  editingMovie: boolean = false;
  isModalOpen: boolean = false;
  expandedMovieId: number | null = null; 
  showInfo: boolean = false;
  genres: string[][] = [[]];
  genrecolor: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  // ogni genere ha un colore basato sul suo nome
  genreColorGen(genre:string): string {
    let hash = 0;
    for (let i = 0; i < genre.length; i++) {
      hash = genre.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
      this.filteredMovies = movies;
      this.genres = this.filteredMovies.map(movie => movie.genres?.split(',') ?? []);
    });
    
  }

  openAddMovieModal(): void {
    this.editingMovie = false;
    this.currentMovie = new Movie();
    this.isModalOpen = true;
  }

  openEditMovieModal(movie: Movie, event: Event): void {
    event.stopPropagation(); 
    this.editingMovie = true;
    this.currentMovie = { ...movie };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(form: any): void {
    if (this.editingMovie) {
      this.movieService.updateMovie(this.currentMovie).subscribe(() => {
        this.loadMovies();
        this.closeModal();
      });
    } else {
      this.movieService.addMovie(this.currentMovie).subscribe(() => {
        this.loadMovies();
        this.closeModal();
      });
    }
  }

  deleteMovie(id: number, event: Event): void {
    event.stopPropagation(); 
    if (confirm('Sei sicuro di voler eliminare questo film?')) {
      this.movieService.deleteMovie(id).subscribe(() => {
        this.loadMovies();
      });
    }
  }

  filterMovies(): void {
    this.filteredMovies = this.movies.filter(movie =>
      movie.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      movie.genres?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      movie.director?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleAccordion(movieId: number): void {
    this.expandedMovieId = this.expandedMovieId === movieId ? null : movieId;
  }

  trackByMovieId(index: number, movie: Movie): number {
    return movie.id!;
  }
}
