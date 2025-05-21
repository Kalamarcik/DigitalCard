import { Component, OnInit } from '@angular/core';
import { UserService, User } from './services/user.service';
import { UserCardComponent } from './components/user-card/user-card.component';
import { ProjectFormComponent } from "./components/project-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserCardComponent, ProjectFormComponent],
  template: ` <app-user-card></app-user-card>
              <app-project-form></app-project-form>`
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
  this.userService.getUserById(4).subscribe({
    next: (user: User) => {
      this.userService.setCurrentUser(user); // burada kaydettik
    },
    error: (err) => console.error('Hata:', err)
  });
}
}
