import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  getProjectsByUserId(userId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.API_URL}/user/${userId}`);
  }

  uploadProject(formData: FormData): Observable<Project> {
    return this.http.post<Project>(this.API_URL, formData);
  }

  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${projectId}`);
  }

  updateProject(id: number, formData: FormData): Observable<Project> {
    return this.http.put<Project>(`${this.API_URL}/${id}`, formData);
  }
}
