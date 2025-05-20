import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserById(3).subscribe({
      next: (data) => {
        console.log("Gelen kullanıcı:", data); // 👈 burada loglama var
        this.user = data;
      },
      error: (err) => console.error('Error:', err)
    });
  }
}
