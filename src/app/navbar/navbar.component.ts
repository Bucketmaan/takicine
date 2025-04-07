import { Component, inject, Input } from '@angular/core';
import {NgIf, TitleCasePipe} from '@angular/common';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'app-navbar',
  standalone: true,
    imports: [TitleCasePipe, NgClass, RouterLink, MatMenu, MatMenuTrigger, MatButton, MatMenuItem, NgIf],
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
