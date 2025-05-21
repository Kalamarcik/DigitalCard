import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { ProjectListComponent } from '../project-list/project-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, ProjectListComponent, RouterModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserById(1).subscribe({
      next: (data) => {
        console.log("Gelen kullanıcı:", data);
        this.user = data;
      },
      error: (err) => console.error('Error:', err)
    });
  }

  goToAddProject(): void {
    window.location.href = '/add-project';
  }
}
