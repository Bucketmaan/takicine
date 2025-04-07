import {Component, DestroyRef, Inject, inject, Input, LOCALE_ID} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Movie} from '../../models/movie';
import {Router, RouterLink} from '@angular/router';
import {MoviesService} from '../../services/movies.service';
import {DatePipe, formatDate, getLocaleDateFormat} from '@angular/common';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {createFutureDateValidator, createOnlyUppercaseValidator} from "../customValidators";

@Component({
    selector: 'app-edit-movie',
    standalone: true,
    imports: [FormsModule, DatePipe, RouterLink, ReactiveFormsModule],
    templateUrl: './edit-movie.component.html',
    styleUrl: './edit-movie.component.scss'
})

export class EditMovieComponent {
    private destroyRef = inject(DestroyRef);
    private readonly router = inject(Router);
    public moviesService = inject(MoviesService);
    private formBuilder = inject(FormBuilder);
    private locale: string = inject(LOCALE_ID);
    private movie: Movie = {} as Movie;

    movieForm = this.formBuilder.group({
        title: ['', [Validators.required, createOnlyUppercaseValidator()]],
        releaseDate: ['', [Validators.required, createFutureDateValidator()]],
        director: ['', [Validators.required, Validators.pattern(/[a-zA-Z]+ [a-zA-Z]+/)]],
        synopsis: ['', [Validators.required, Validators.minLength(31)]]
    });

    @Input({required: true}) set movieId(movieId: number) {
        this.moviesService.getMovieById(movieId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(movie => {
                this.movie = movie;
                this.movieForm.setValue({
                    title: movie.title,
                    releaseDate: formatDate(movie.releaseDate, 'yyyy-MM-dd', this.locale),
                    synopsis: movie.synopsis,
                    director: movie.director
                });
            });
    }

    public editMovie(): void {
        this.movie.title = this.movieForm.value.title!;
        this.movie.director = this.movieForm.value.director!;
        this.movie.synopsis = this.movieForm.value.synopsis!;
        this.movie.releaseDate = new Date(Date.parse(this.movieForm.value.releaseDate!));

        this.moviesService.editMovie(this.movie!)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.router.navigate(['/movies']));
    }
}

