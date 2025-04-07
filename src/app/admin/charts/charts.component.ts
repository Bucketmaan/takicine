import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import {ReviewsService} from "../../services/reviews.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MoviesService} from "../../services/movies.service";

@Component({
    selector: 'app-line-chart',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    standalone: true
})
export class ChartsComponent implements OnInit {
    private moviesService = inject(MoviesService);
    private destroyRef = inject(DestroyRef);

    constructor() {
    }

    ngOnInit(): void {
        this.createChart();
    }

    public lineChart: any;

    createChart() {
        let labels: string[] = [];
        let data: number[] = [];
        this.moviesService.getMovies()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(movies => {
                for (let movie of movies) {
                    labels.push(movie.title);
                    data.push(movie.rate ?? 0);
                }

                this.lineChart = new Chart('lineChart', {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Note par film',
                                data: data,
                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1,
                            },
                        ],
                    },
                });
            });

        console.log(data);
        console.log(labels);

    }
}