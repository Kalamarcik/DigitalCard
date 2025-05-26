import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// MAİN BURDA MI
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
  email: string;
  socialMediaList: SocialMedia[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://192.168.1.69:8080/api/users';
  currentUser!: User;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = JSON.parse(localStorage.getItem('token') || '{}');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  getUserByUsername(username: string): Observable<User> {
  const token = localStorage.getItem('token');
  const options = token && token !== '{}'
    ? { headers: this.getAuthHeaders() }
    : {};
  return this.http.get<User>(`${this.API_URL}/by-username/${username}`, options);
}

  getUserByUsernameWithLocation(username: string, lat: number, lon: number): Observable<User> {
  const token = localStorage.getItem('token');
  const options = token && token !== '{}'
    ? {
        headers: this.getAuthHeaders(),
        params: {
          lat: lat.toString(),
          lon: lon.toString()
        }
      }
    : {
        params: {
          lat: lat.toString(),
          lon: lon.toString()
        }
      };
  return this.http.get<User>(`${this.API_URL}/by-username/${username}`, options);
}
}
