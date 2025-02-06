import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: 'profile', component: ProfileComponent },

    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
