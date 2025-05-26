// src/app/services/skill.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Skill {
  id: number;
  name: string;
  level: number;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = 'http://192.168.1.69:8080/api/skills';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = JSON.parse(localStorage.getItem('token') || '{}');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getSkillsByUserId(userId: number): Observable<Skill[]> {
  const token = localStorage.getItem('token');
  const options = token
    ? { headers: this.getAuthHeaders() }
    : {}; // login yoksa header gönderilmesin

  return this.http.get<Skill[]>(`${this.apiUrl}/user/${userId}`, options);
}

  addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.apiUrl, skill, {
      headers: this.getAuthHeaders()
    });
  }

  updateSkill(id: number, skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiUrl}/${id}`, skill, {
      headers: this.getAuthHeaders()
    });
  }

  deleteSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  saveSkillList(skills: { name: string; level: number; userId: number }[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/bulk`, skills, {
      headers: this.getAuthHeaders()
    });
  }
}
