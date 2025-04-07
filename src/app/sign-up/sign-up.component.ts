import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {User} from "../models/user";
import {repeat} from "rxjs";
import {NgIf} from "@angular/common";
import {MoviesService} from "../services/movies.service";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-sign-up',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        NgIf
    ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
    public moviesService = inject(MoviesService);
    public usersService = inject(UsersService);

    user: User = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        age: 0,
        id: undefined,
        points: 0
    }
    ConfirmPassword: string | undefined;

    public SignUP(): void{
        this.usersService.postUser(this.user).subscribe((newUser) => {
            this.user.id = newUser.id;
            localStorage.setItem('user_id', JSON.stringify(this.user.id));
        })
    }
}
