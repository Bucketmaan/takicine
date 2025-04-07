import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../models/movie';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [FormsModule, DatePipe, RouterLink],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.scss'
})
export class EditMovieComponent {
  route = inject(ActivatedRoute);
  private id : number = -1;
  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id !== -1)
      this.getMovieById(this.id);
  }
  movie: Movie | undefined = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate:  undefined, 
    image: undefined
}
  private readonly router = inject(Router);
  public moviesService = inject(MoviesService);
  public editMovie(): void {
    this.moviesService.editMovie(this.movie!).subscribe(
      () => this.router.navigate(['/movies'])
  );
}

  public getMovieById(id: number): void {
    console.log(id);
    this.moviesService.getMovies().subscribe(movies => {
      this.movie = movies.find(movie => movie.id === id);
      console.log(this.movie);
      if (this.movie === undefined) {
        throw new Error('Movie not found');
      }
    }
      );
  }
}

