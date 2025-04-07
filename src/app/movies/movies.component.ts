import { Component, DestroyRef, inject } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { AsyncPipe, DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {FooterComponent} from "../footer/footer.component";
@Component({
  selector: 'app-movies',
  standalone: true,
    imports: [AsyncPipe, DatePipe, RouterLink, FooterComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  movies: Movie[] | undefined;
ngOnInit(): void {
    this.moviesService.getMovies().subscribe(movies => this.movies = movies);
}
  private readonly moviesService = inject(MoviesService);
  movies$: Observable<Movie[]> = this.moviesService.getMovies();
  
  private destroyRef = inject(DestroyRef);    
  public deleteMovie(id: number): void {
    this.moviesService.deleteMovie(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.movies = this.movies!.filter(film => film.id !== id)}
    );
  }

}


