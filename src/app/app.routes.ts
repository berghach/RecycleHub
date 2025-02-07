import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { CollectionsListComponent } from './collection/collections-list/collections-list.component';
import { CollectionFormComponent } from './collection/collection-form/collection-form.component';
import { CollectionDetailComponent } from './collection/collection-detail/collection-detail.component';

// Define the routes

export const routes: Routes = [
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

    { path: 'collections', component: CollectionsListComponent },
    { path: 'collection/request/:id', component: CollectionFormComponent },
    { path: 'collection/request-detail/:id', component: CollectionDetailComponent },
    
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
