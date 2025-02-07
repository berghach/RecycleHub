import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';
import { preRegisteredUsers } from './services/users';
import { HashService } from './services/hash.service.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavBarComponent,
    CommonModule
  ],
  // standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'recycle-hub';
  showNavBar: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private hashService: HashService,
    private router: Router
  ) {}

  async ngOnInit() {
    const Users = this.localStorageService.getItem('users');
    if (!Users) {
      const hashedUsers = await this.hashPasswords(preRegisteredUsers);
      this.localStorageService.setItem('users', hashedUsers);
    }
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showNavBar = this.shouldShowNavBar(event.urlAfterRedirects);
    });
  }
  async hashPasswords(users: any[]): Promise<any[]> {
    const hashedUsers = [];
    for (const user of users) {
      const hashedPassword = await this.hashService.hashPassword(user.password);
      hashedUsers.push({ ...user, password: hashedPassword });
    }
    return hashedUsers;
  }

  shouldShowNavBar(url: string): boolean {
    const hideNavBarRoutes = ['/login', '/register'];
    return !hideNavBarRoutes.includes(url);
  }
}
