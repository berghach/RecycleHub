import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { HashService } from '../../services/hash.service.service';
import { profile } from 'console';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
  ],
  // standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private localStorageService: LocalStorageService,
    private hashService: HashService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      birthDate: ['', Validators.required],
      profilePhoto: [null],
    }, { validators: this.passwordMatchValidator });
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }
  async onSubmit() {
    if (this.registerForm.valid) {
      const users = this.localStorageService.getItem('users') || [];
      const nextId = users.length + 1;

      const hashedPassword = await this.hashService.hashPassword(this.registerForm.get('password')!.value);
      
      const newUser = {
        id: nextId,
        email: this.registerForm.value.email,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        address: this.registerForm.value.address,
        phone: this.registerForm.value.phone,
        birthDate: this.registerForm.value.birthDate,
        profilePhoto: this.registerForm.value.profilePhoto,
        password: hashedPassword,
        role: 'particular',
      };

      users.push(newUser);
      this.localStorageService.setItem('users', users);
      console.log('Particular registered and saved to local storage', newUser);
    }else{
      console.log('Form Invalid', this.registerForm.value);
    }
  }
}
