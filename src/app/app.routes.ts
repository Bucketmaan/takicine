import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'movies', component: MoviesComponent},
    { path: 'newMovie', component: AddMovieComponent},
    { path: 'editMovie/:id', component: EditMovieComponent},
];

