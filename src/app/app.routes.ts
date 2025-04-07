import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MoviesComponent} from './movies/movies.component';
import {AddMovieComponent} from './movies/add-movie/add-movie.component';
import {EditMovieComponent} from './movies/edit-movie/edit-movie.component';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {PanelComponent} from "./admin/panel/panel.component";
import {ChartsComponent} from "./admin/charts/charts.component";

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'movies', component: MoviesComponent},
    {path: 'newMovie', component: AddMovieComponent},
    {path: 'editMovie/:movieId', component: EditMovieComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'admin', component: PanelComponent},
    {path: 'admin/charts', component: ChartsComponent}
];

