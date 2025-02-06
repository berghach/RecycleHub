import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { HashService } from '../hash.service.service';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isUserLoggedIn: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private hashService: HashService,
  ) { }

  async login(email: string, password: string): Promise<Observable<boolean>> {
    console.log(email);
    console.log(password);
    const users = this.localStorageService.getItem('users') || [];
    // console.log(users);
    const user = [...users].find(u => u.email === email);

    if (user && await this.hashService.comparePassword(password, user.password)) {
      this.isUserLoggedIn = true;

      localStorage.setItem('LoggedInUser', JSON.stringify(user));
      console.log('Login successful', user.firstName, user.lastName, user.role, user.email);
    }
    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap(val => { 
        console.log("Is User Authentication is successful: " + val); 
      })
    );
 }

 getLoggedInUser(): any {
  const userJson = localStorage.getItem('LoggedInUser');
  return userJson ? JSON.parse(userJson) : null;
}

 logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('LoggedInUser'); 
    console.log('User logged out');
 }
}
