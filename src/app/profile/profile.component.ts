import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { CommonModule } from '@angular/common';

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
  profileForm: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
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
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedUser = { ...this.user, ...this.profileForm.getRawValue() };
      this.localStorageService.setItem('LoggedInUser', updatedUser);
      this.user = updatedUser;
      this.isEditing = false;
    } else {
      console.log('Form Invalid', this.profileForm.value);
    }
  }

}
