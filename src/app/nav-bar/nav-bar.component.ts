import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  showMobileMenu: boolean = false;

  constructor(
    private loginService: LoginService
  ) { }

  toggleMobileMenu(){
    this.showMobileMenu = !this.showMobileMenu;
  }

  onClickLogout() {
    this.loginService.logout();
  }
}
