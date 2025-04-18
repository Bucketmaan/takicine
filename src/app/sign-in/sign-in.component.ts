import { Component, inject } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {UsersService} from "../services/users.service";
import {User} from "../models/user";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  public usersService = inject(UsersService);
  email = '';
  password = '';
  private messageService = inject(MessageService);

  public SignIN(): void{
    this.usersService.getUsers().subscribe((users) => {
        for (let index = 0; index < users.length; index++) {

          const element: User = users[index];

          if (element.email == this.email)
          {
            localStorage.setItem('user_id', JSON.stringify(element.id));
            console.log("oui");
            this.showSuccess();
            break;
          }
          
        }
    })
}
private showSuccess() {
  this.messageService.add({severity: 'success', summary: 'Connecté', detail: 'Vous êtes connecté!'});
}
}
