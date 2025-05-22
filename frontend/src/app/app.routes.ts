import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/user-card/user-card.component').then(m => m.UserCardComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'add-project',
    loadComponent: () =>
      import('./components/project-form/project-form.component').then(m => m.ProjectFormComponent)
  },
  {
    path: 'profile/edit',
    loadComponent: () => import('./components/profile-edit/profile-edit.component').then(m => m.ProfileEditComponent)
  }
];
