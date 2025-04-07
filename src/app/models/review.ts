import {User} from "./user";
import {Movie} from "./movie";

export interface Review {
    id?: number;
    rate: number;
    text: string;
    reviewDate: Date;
    user: User;
    movie: Movie;
}
