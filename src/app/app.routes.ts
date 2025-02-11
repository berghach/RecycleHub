import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { CollectionsListComponent } from './collection/collections-list/collections-list.component';
import { CollectionFormComponent } from './collection/collection-form/collection-form.component';
import { CollectionDetailComponent } from './collection/collection-detail/collection-detail.component';
import { ParticularGuard } from './guards/particular.guard';


export const routes: Routes = [
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

    { path: 'collections', component: CollectionsListComponent, canActivate: [AuthGuard] },
    { path: 'collection/request/:id', component: CollectionFormComponent, canActivate: [ParticularGuard] },
    { path: 'collection/request/delete/:id', component: CollectionFormComponent, canActivate: [ParticularGuard] },
    { path: 'collection/request-detail/:id', component: CollectionDetailComponent, canActivate: [AuthGuard] },
    
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
