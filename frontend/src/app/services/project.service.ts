import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  demoUrl: any;
  githubUrl: any;
  id?: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private API_URL = 'http://192.168.1.69:8080/api/projects';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = JSON.parse(localStorage.getItem('token') || '{}');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getProjectsByUserId(userId: number): Observable<Project[]> {
  const token = localStorage.getItem('token');
  const options = token
    ? { headers: this.getAuthHeaders() }
    : {}; // login yoksa header gönderme

  return this.http.get<Project[]>(`${this.API_URL}/user/${userId}`, options);
}
  uploadProject(formData: FormData): Observable<Project> {
    return this.http.post<Project>(this.API_URL, formData, {
      headers: this.getAuthHeaders()
    });
  }

  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${projectId}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateProject(id: number, formData: FormData): Observable<Project> {
    return this.http.put<Project>(`${this.API_URL}/${id}`, formData, {
      headers: this.getAuthHeaders()
    });
  }
}
