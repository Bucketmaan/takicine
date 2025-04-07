import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly httpClient = inject(HttpClient);
  private readonly url = 'http://localhost:8080/users';

  constructor() { }


  postUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.url}`, user);
  }
}
