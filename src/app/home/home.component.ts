import { Component, inject } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MovieComponent } from './movie/movie.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, DatePipe, MovieComponent, RouterLink, CommonModule, NgbCarouselModule, CarouselModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly moviesService = inject(MoviesService);
  movies$: Observable<Movie[]> = this.moviesService.getMovies();

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  

}
