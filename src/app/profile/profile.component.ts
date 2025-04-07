import {Component, inject, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {User} from "../models/user";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FooterComponent,
    RouterLink,
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  showWelcome = false;
  public user!: User;

  ngOnInit(): void {
    const token = localStorage.getItem('user_id');
    if (token) {
      this.showWelcome = true;
      this.userService.getUser(parseInt(token, 10)).subscribe(user => {this.user = user;});
    }
  }
  public userService = inject(UsersService);



}
