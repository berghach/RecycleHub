import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { FormGroup } from '@angular/forms';
import { HashService } from '../hash.service.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private localStorageService: LocalStorageService,
    private hashService: HashService,
    private loginService: LoginService,
    private router: Router
  ) { }

  async register(data: FormGroup){
    const users = this.localStorageService.getItem('users') || [];
    const nextId = users.length + 1;

    const hashedPassword = await this.hashService.hashPassword(data.get('password')?.value);

    const newUser = {
      id: nextId,
      email: data.get('email')?.value,
      firstName: data.get('firstName')?.value,
      lastName: data.get('lastName')?.value,
      address: data.get('address')?.value,
      phone: data.get('phone')?.value,
      birthDate: data.get('birthDate')?.value,
      profilePhoto: data.get('profilePhoto')?.value,
      password: hashedPassword,
      role: 'particular',
    };
    users.push(newUser);
    this.localStorageService.setItem('users', users);
    console.log('Particular registered and saved to local storage', newUser);

    (await this.loginService.login(newUser.email, data.get('password')?.value))
    .subscribe(loginData => {
      if (loginData) {
        this.router.navigate(['/profile']);
      }
    });
  }
}
