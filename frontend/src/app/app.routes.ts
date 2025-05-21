import { Routes } from '@angular/router';
import { UserCardComponent } from './components/user-card/user-card.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';

export const routes: Routes = [
  {
    path: '',
    component: UserCardComponent
  },
  {
    path: 'add-project',
    component: ProjectFormComponent
  }
];
