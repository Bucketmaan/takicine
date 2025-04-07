import { Component, inject } from '@angular/core';
import { Movie } from '../../models/movie';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [FormsModule, RouterLink, ToastModule],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.scss'
})
export class AddMovieComponent {
  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined, 
    image: undefined
  };

  private readonly router = inject(Router);
  public moviesService = inject(MoviesService);
  private readonly messageService = inject(MessageService); 

  public addMovie(): void {
    this.moviesService.addMovie(this.movie).subscribe(
      () => {
        this.showSuccess();
        this.router.navigate(['/movies']);
      }
    );
  } 

  private showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Bravo', detail: 'Film ajouté!' });
  }
}
