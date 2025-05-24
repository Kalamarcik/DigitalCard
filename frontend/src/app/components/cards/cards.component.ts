// src/app/pages/cards/cards.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cards',
    standalone: true,
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.css'],
    imports: [FormsModule, CommonModule]

})
export class CardsComponent implements OnInit {

    users: User[] = [];
    searchQuery: string = '';
    contactModalOpen = false;
    selectedUser!: User;

    constructor(private userService: UserService,
        private http: HttpClient,
        private router: Router) { 
            
        }
    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(query: string = ''): void {
        const url = query
            ? `http://192.168.1.69:8080/api/users/cards?query=${encodeURIComponent(query)}`
            : `http://192.168.1.69:8080/api/users/cards`;

        this.http.get<User[]>(url).subscribe({
            next: (data) => this.users = data,
            error: (err) => console.error('Kullanıcılar alınamadı:', err)
        });
    }

    searchUsers(): void {
        this.loadUsers(this.searchQuery);
    }

    openContactModal(user: User): void {
        this.selectedUser = user;
        this.contactModalOpen = true;
    }

    closeContactModal(): void {
        this.contactModalOpen = false;
    }

    goToProfile(username: string): void {
        this.router.navigate(['/cards', username]);
    }
}
