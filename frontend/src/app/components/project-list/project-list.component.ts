import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService, Project } from '../../services/project.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  @Input() userId!: number;
  projects: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjectsByUserId(this.userId).subscribe({
      next: (data) => (this.projects = data),
      error: (err) => console.error('Projeler alınamadı:', err)
    });
  }

  goToAddProject(): void {
    this.router.navigate(['/add-project']);
  }
}
