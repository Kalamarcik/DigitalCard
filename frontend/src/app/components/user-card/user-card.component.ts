import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { ProjectListComponent } from '../project-list/project-list.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, ProjectListComponent, RouterModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  user!: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      const userId = userObj.id;

      this.userService.getUserById(userId).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => console.error('Kullanıcı yüklenemedi:', err)
      });
    } else {
      // localStorage'da kullanıcı yoksa login sayfasına yönlendir
      this.router.navigate(['/auth/login']);
    }
  }


  logout(): void {
  localStorage.removeItem('currentUser');
  this.router.navigate(['/auth/login']);
}

  goToAddProject(): void {
    this.router.navigate(['/add-project']);
  }
}
