import { Component, inject, Input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TitleCasePipe, NgClass, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  router = inject(Router)
  @Input({ required: true }) title! : string
  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
