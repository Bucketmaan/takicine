import {Component, DestroyRef, inject} from '@angular/core';
import {MoviesService} from "../../services/movies.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {UsersService} from "../../services/users.service";
import {ReviewsService} from "../../services/reviews.service";

@Component({
    selector: 'app-panel',
    standalone: true,
    imports: [],
    templateUrl: './panel.component.html',
    styleUrl: './panel.component.scss'
})
export class PanelComponent {
    data: ITakicineInfos = {} as ITakicineInfos;
    private moviesService = inject(MoviesService);
    private usersService = inject(UsersService);
    private reviewsService = inject(ReviewsService);
    private destroyRef = inject(DestroyRef);

    ngOnInit() {
        this.gatherData();
    }

    private gatherData() {
        this.moviesService.getMovies()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(movies => {
                this.data.filmCount = movies.length;
            });

        this.usersService.getUsers()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(users => {
                this.data.userCount = users.length;
            });

        this.reviewsService.getReviews()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(reviews => {
                this.data.reviewCount = reviews.length;
                let totalRating: number = 0;
                for (let review of reviews) {
                    totalRating += review.rate;
                }
                this.data.meanRating = Math.floor(totalRating / reviews.length / 5 * 100);
            });
    }
}


interface ITakicineInfos {
    filmCount: number;
    userCount: number;
    reviewCount: number;
    meanRating: number;
}