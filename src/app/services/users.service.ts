import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private readonly httpClient = inject(HttpClient);
    private readonly url = 'http://localhost:8080/users';

    constructor() {
    }

    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.url);
    }
}
