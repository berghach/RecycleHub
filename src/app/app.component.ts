import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';
import { preRegisteredUsers } from './services/users';
import { HashService } from './services/hash.service.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  // standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'recycle-hub';

  constructor(
    private localStorageService: LocalStorageService,
    private hashService: HashService
  ) {}

  async ngOnInit() {
    const Users = this.localStorageService.getItem('users');
    if (!Users) {
      const hashedUsers = await this.hashPasswords(preRegisteredUsers);
      this.localStorageService.setItem('users', hashedUsers);
    }
  }
  async hashPasswords(users: any[]): Promise<any[]> {
    const hashedUsers = [];
    for (const user of users) {
      const hashedPassword = await this.hashService.hashPassword(user.password);
      hashedUsers.push({ ...user, password: hashedPassword });
    }
    return hashedUsers;
  }
}
