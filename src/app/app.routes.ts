
import { Routes } from '@angular/router';
import { AuthRoutingModule } from './feautres/auth/auth-routing.module';
import { DashboardRoutingModule } from './feautres/dashboard/dashboard-routing.module';


export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'auth', loadChildren: () => import('./feautres/auth/auth.module').then(m => m.AuthModule) },
    { path: 'dashboard', loadChildren: () => import('./feautres/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: '**', redirectTo: 'auth/login' }
];
export const AppRoutingModule = [

    AuthRoutingModule,
    DashboardRoutingModule
];