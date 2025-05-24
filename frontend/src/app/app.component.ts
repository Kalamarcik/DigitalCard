import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService, User } from './services/user.service';
import { UserCardComponent } from './components/user-card/user-card.component';
import { ProjectFormComponent } from "./components/project-form/project-form.component";
import { HeaderComponent } from "./components/header/header.component";
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserCardComponent, ProjectFormComponent, RouterModule, HeaderComponent],
  template: `
            <app-header></app-header>
            <router-outlet></router-outlet>
            `
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService, private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.initializeTheme();
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userObj: User = JSON.parse(storedUser);
      this.userService.setCurrentUser(userObj); // servise yükle
    }
  }
}
