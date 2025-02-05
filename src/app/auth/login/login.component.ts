import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { HashService } from '../../services/hash.service.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
  ],
  // standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private hashService: HashService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const users = this.localStorageService.getItem('users') || [];
      
      const user =  [...users].find(u => u.email === email );

      if (user && await this.hashService.comparePassword(password, user.password)) {
        console.log('Login successful', user.firstName, user.lastName, user.role, user.email);
        // this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid email or password';
        console.log('Login failed', email, password);
        console.log('Login Form Submitted', this.loginForm.value);
      }
    }
  }
}
