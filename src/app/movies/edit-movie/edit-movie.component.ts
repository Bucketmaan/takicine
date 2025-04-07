import {Component, DestroyRef, inject, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Movie} from '../../models/movie';
import {Router, RouterLink} from '@angular/router';
import {MoviesService} from '../../services/movies.service';
import {DatePipe} from '@angular/common';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-edit-movie',
    standalone: true,
    imports: [FormsModule, DatePipe, RouterLink],
    templateUrl: './edit-movie.component.html',
    styleUrl: './edit-movie.component.scss'
})

export class EditMovieComponent {
    private destroyRef = inject(DestroyRef);
    private readonly router = inject(Router);
    public moviesService = inject(MoviesService);

    movie: Movie | undefined = {
        title: '',
        director: '',
        releaseDate: new Date(),
        synopsis: '',
        id: undefined,
        rate: undefined,
        image: undefined
    }

    @Input({required: true}) set movieId(movieId: number) {
        this.moviesService.getMovieById(movieId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(movie => {
                this.movie = movie;
            });
    }

    public editMovie(): void {
        this.moviesService.editMovie(this.movie!)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.router.navigate(['/movies']));
    }
}

