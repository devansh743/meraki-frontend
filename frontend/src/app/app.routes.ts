import { Routes } from '@angular/router'; // Updated routes
import { HeroComponent } from './components/hero/hero.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HeroComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'admin-panel',
        component: AdminComponent,
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '' }
];
