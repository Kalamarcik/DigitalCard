import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService, Project } from '../../services/project.service';
import { RouterModule } from '@angular/router';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProjectFormComponent, ProjectCardComponent, ProjectEditComponent],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  @Input() userId!: number;
  @Input() editable!: boolean;

  projects: Project[] = [];

  showAddModal = false;
  showEditModal = false;
  selectedProject: Project | null = null;

  constructor(private projectService: ProjectService) { }

    private getAuthHeaders(): HttpHeaders {
    const token = JSON.parse(localStorage.getItem('token') || '{}');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }


  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjectsByUserId(this.userId).subscribe({
      next: (data) => (this.projects = data),
      error: (err) => console.error('Projeler alınamadı:', err)
    });
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  onProjectUploaded(): void {
    this.closeAddModal();
    this.loadProjects();
  }

  openEditModal(project: Project): void {
    this.selectedProject = project;
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedProject = null;
  }

  onProjectUpdated(): void {
    this.loadProjects();
  }

  editingProject: Project | null = null; // şu an düzenlenen proje


  openEditModal2(project: Project): void {
    this.editingProject = project;
  }

  closeEditModal2(): void {
    this.editingProject = null;
  }

  onProjectUpdated2(): void {
    this.loadProjects(); // güncel projeleri tekrar yükle
  }
}
