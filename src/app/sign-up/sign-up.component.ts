import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {User} from "../models/user";
import {repeat} from "rxjs";
import {NgIf} from "@angular/common";

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
    user: User = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        age: 0,
        id: undefined
    }
    ConfirmPassword: string | undefined;
}
