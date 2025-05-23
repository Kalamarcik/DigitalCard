import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService, Project } from '../../services/project.service';
import { RouterModule, Router } from '@angular/router';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { ProjectCardComponent } from "../project-card/project-card.component";


@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProjectFormComponent, ProjectCardComponent],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {
  @Input() userId!: number;
  projects: Project[] = [];
  showModal = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjectsByUserId(this.userId).subscribe({
      next: (data) => (this.projects = data),
      error: (err) => console.error('Projeler alınamadı:', err)
    });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onProjectUploaded(): void {
    this.closeModal();
    this.loadProjects(); // yeni projeleri tekrar yükle
  }
}

