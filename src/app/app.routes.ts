import { Routes } from '@angular/router';
import { MainLayout } from './layouts';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    loadChildren: () => import('./layouts/main-layout/main.routes').then(m => m.MAIN_ROUTES)
  },
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth-layout/auth-layout').then(m => m.AuthLayout),
    loadChildren: () => import('./layouts/auth-layout/auth.routes').then(m => m.AUTH_ROUTES)
  }
];