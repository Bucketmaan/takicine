import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie';

@Injectable({
    providedIn: 'root'
})
export class MoviesService {
    private readonly httpClient = inject(HttpClient);
    private readonly url = 'http://localhost:8080/movies';

    getMovieById(id: number): Observable<Movie> {
        return this.httpClient.get<Movie>(`${this.url}/${id}`);
    }

    getMovies(): Observable<Movie[]> {
        return this.httpClient.get<Movie[]>(this.url);
    }

    addMovie(movie: Movie): Observable<Movie> {
        return this.httpClient.post<Movie>(this.url, movie);
    }

    editMovie(movie: Movie): Observable<Movie> {
        return this.httpClient.put<Movie>(`${this.url}/${movie.id}`, movie);
    }

    deleteMovie(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.url}/${id}`);
    }

}
