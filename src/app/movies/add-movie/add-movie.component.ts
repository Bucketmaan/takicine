import {Component, DestroyRef, inject, Type} from '@angular/core';
import {Movie} from '../../models/movie';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MoviesService} from '../../services/movies.service';
import {Router, RouterLink} from '@angular/router';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {createFutureDateValidator, createOnlyUppercaseValidator} from "../customValidators";

@Component({
    selector: 'app-add-movie',
    standalone: true,
    imports: [FormsModule, RouterLink, ReactiveFormsModule],
    templateUrl: './add-movie.component.html',
    styleUrl: './add-movie.component.scss'
})
export class AddMovieComponent {
    movie: Movie = {} as Movie;
    private readonly router = inject(Router);
    public moviesService = inject(MoviesService);
    private destroyRef = inject(DestroyRef);
    private formBuilder = inject(FormBuilder);

    movieForm = this.formBuilder.group({
        title: ['', [Validators.required, createOnlyUppercaseValidator()]],
        releaseDate: ['', [Validators.required, createFutureDateValidator()]],
        director: ['', [Validators.required, Validators.pattern(/[a-zA-Z]+ [a-zA-Z]+/)]],
        synopsis: ['', [Validators.required, Validators.minLength(31)]],
        rating: [undefined, [Validators.min(0), Validators.max(5)]],
    });

    public addMovie(): void {
        this.movie.title = this.movieForm.value.title!;
        this.movie.director = this.movieForm.value.director!;
        this.movie.synopsis = this.movieForm.value.synopsis!;
        this.movie.releaseDate = new Date(Date.parse(this.movieForm.value.releaseDate!));
        if (this.movieForm.value.rating != undefined) {
            this.movie.rate = parseInt(this.movieForm.value.rating!);
        }

        this.moviesService.addMovie(this.movie)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.router.navigate(['/movies']));
    }

}

interface IMovieForm {
    title: FormControl<string>;
    director: FormControl<string>;
    synopsis: FormControl<string>;
    rating: FormControl<number | undefined>;
    releaseDate: FormControl<Date>;
}
