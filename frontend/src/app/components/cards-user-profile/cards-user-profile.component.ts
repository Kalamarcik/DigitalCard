import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { ProjectListComponent } from "../project-list/project-list.component";
import { CommonModule } from '@angular/common';
import { CardsProjectListComponent } from '../cards-project-list/cards-project-list.component';

@Component({
  selector: 'app-cards-user-profile',
  templateUrl: './cards-user-profile.component.html',
  styleUrls: ['./cards-user-profile.component.css'],
  imports: [CardsProjectListComponent, CommonModule]
})
export class UserProfileComponent implements OnInit {
openContactModal() {
throw new Error('Method not implemented.');
}
closeContactModal() {
throw new Error('Method not implemented.');
}
  user!: User;
  username!: string;
  loading = true;
  error = '';
contactModalOpen: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    this.http.get<User>(`http://192.168.1.69:8080/api/users/by-username/${this.username}`).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Kullanıcı bulunamadı';
        this.loading = false;
      }
    });
  }
}
