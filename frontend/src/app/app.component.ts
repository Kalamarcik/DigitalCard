import { Component, OnInit } from '@angular/core';
import { UserService, User } from './services/user.service';
import { UserCardComponent } from './components/user-card/user-card.component';
import { ProjectFormComponent } from "./components/project-form.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserCardComponent, ProjectFormComponent, RouterModule],
  template: ` 
              <router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
  this.userService.getUserById(3).subscribe({
    next: (user: User) => {
      this.userService.setCurrentUser(user); // burada kaydettik
    },
    error: (err) => console.error('Hata:', err)
  });
}
}
