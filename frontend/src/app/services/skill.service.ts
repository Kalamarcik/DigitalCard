// src/app/services/skill.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getSkillsByUserId(userId: number): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/user/${userId}`);
  }

  addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.apiUrl, skill);
  }

  updateSkill(id: number, skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiUrl}/${id}`, skill);
  }

  deleteSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  saveSkillList(skills: { name: string; level: number; userId: number }[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/bulk`, skills);
  }
}
