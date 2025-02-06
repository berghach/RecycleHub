import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user: any; 
  isEditing: boolean = false;
  isChangingPassword: boolean = false;
  profileForm: FormGroup; 
  passwordForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private profileService: ProfileService,
    private router: Router,
    private loginService: LoginService
  ){
    this.user = this.localStorageService.getItem('LoggedInUser');

    this.profileForm = this.fb.group({
      firstName: [this.user?.firstName, Validators.required],
      lastName: [this.user?.lastName, Validators.required],
      email: [{ value: this.user?.email, disabled: true }, [Validators.required, Validators.email]],
      phone: [this.user?.phone, [Validators.required, Validators.pattern('^[0-9]*$')]],
      address: [this.user?.address, Validators.required],
      birthDate: [this.user?.birthDate, Validators.required],
      profilePhoto: [this.user?.profilePhoto]
    });

    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  toggleChangePassword(): void {
    this.isChangingPassword = !this.isChangingPassword;
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedUser = { ...this.user, ...this.profileForm.getRawValue() };
      this.profileService.updateUser(updatedUser);
      this.user = updatedUser;
      this.isEditing = false;
    } else {
      console.log('Form Invalid', this.profileForm.value);
    }
  }

  async onChangePassword(): Promise<void> {
    if (this.passwordForm.valid) {
      const newPassword = this.passwordForm.get('newPassword')?.value;
      await this.profileService.changePassword(newPassword);
      this.isChangingPassword = false;
      this.passwordForm.reset();
    } else {
      console.log('Password Form Invalid', this.passwordForm.value);
    }
  }

  onDeleteProfile(): void {
    this.profileService.deleteUser();
    this.loginService.logout();
    this.router.navigate(['/register']);
  }

}
