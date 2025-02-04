import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';
import { preRegisteredUsers } from './services/users';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  // standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'recycle-hub';

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    const Users = this.localStorageService.getItem('users');
    if (!Users) {
      this.localStorageService.setItem('users', preRegisteredUsers);
    }
  }
}
