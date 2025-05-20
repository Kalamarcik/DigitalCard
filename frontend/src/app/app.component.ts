import { Component, OnInit } from '@angular/core';
import { UserService, User } from './services/user.service';
import { UserCardComponent } from './components/user-card/user-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserCardComponent],
  template: `<app-user-card></app-user-card>`
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserById(3).subscribe({
      next: (user: User) => console.log('Kullanıcı:', user),
      error: (err) => console.error('Hata:', err)
    });
  }
}
