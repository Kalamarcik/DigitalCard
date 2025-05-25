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


    handleMouseMove(event: MouseEvent, card: HTMLElement): void {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 12;
        const rotateY = (x - centerX) / 12;

        const transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        card.style.transform = transform;
        card.dataset['originalTransform'] = transform;
    }

    resetCardTransform(card: HTMLElement): void {
        card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
        card.dataset['originalTransform'] = card.style.transform;
    }

    handleMouseDown(card: HTMLElement): void {
        const current = card.dataset['originalTransform'] || '';
        card.style.transform = `${current} scale(0.98)`;
    }

    handleMouseUp(card: HTMLElement): void {
        card.style.transform = card.dataset['originalTransform'] || '';
    }

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
