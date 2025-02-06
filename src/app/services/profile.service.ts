import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HashService } from './hash.service.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private localStorageService: LocalStorageService,
    private hashService: HashService
  ) { }

  getUser(): any {
    return this.localStorageService.getItem('LoggedInUser');
  }

  updateUser(user: any): void {
    const users = this.localStorageService.getItem('users') || [];
    const index = users.findIndex((u: any) => u.id === user.id);
    if (index >= 0) {
      users[index] = user;
      this.localStorageService.setItem('users', users);
      this.localStorageService.setItem('LoggedInUser', user);
    }
  }

  deleteUser(): void {
    this.localStorageService.removeItem('LoggedInUser');
  }

  async changePassword(newPassword: string): Promise<void> {
    const user = this.getUser();
    user.password = await this.hashService.hashPassword(newPassword);
    this.updateUser(user);
  }
}