import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService, User } from './services/user.service';
import { UserCardComponent } from './components/user-card/user-card.component';
import { ProjectFormComponent } from "./components/project-form.component";
import { HeaderComponent } from "./components/header/header.component";

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userObj: User = JSON.parse(storedUser);
      this.userService.setCurrentUser(userObj); // servise yükle
    }
  }
}
