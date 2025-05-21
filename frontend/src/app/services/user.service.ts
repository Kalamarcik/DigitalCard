import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface SocialMedia {
  id: number;
  platform: string;
  url: string;
}

export interface User {
  subscribe(arg0: { next: (data: any) => void; error: (err: any) => void; }): unknown;
  id: number;
  username: string;
  fullName: string;
  bio: string;
  avatarUrl: string;
  socialMediaList: SocialMedia[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://192.168.1.69:8080/api/users'; // spring ip
  currentUser!: User;

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`);
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }
}
