// src/app/components/project-edit/project-edit.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
onCancel() {
throw new Error('Method not implemented.');
}
  @Input() project!: Project;
  @Input() onClose!: () => void;
  @Input() onUpdate!: () => void;

  form!: FormGroup;
  selectedFile: File | null = null;
  message = '';

  constructor(private fb: FormBuilder, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.project.title, Validators.required],
      description: [this.project.description, Validators.required],
      technologies: [this.project.technologies.join(', '), Validators.required]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedProject = {
        ...this.project,
        ...this.form.value,
        technologies: this.form.value.technologies
          .split(',')
          .map((t: string) => t.trim())
          .filter((t: string) => t.length > 0)
      };

      const formData = new FormData();
      formData.append('project', new Blob([JSON.stringify(updatedProject)], { type: 'application/json' }));
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.projectService.updateProject(this.project.id!, formData).subscribe({
        next: () => {
          this.message = 'Proje başarıyla güncellendi';
          this.onUpdate();
          this.onClose();
        },
        error: () => {
          this.message = 'Hata oluştu';
        }
      });
    }
  }

  cancel(): void {
    this.onClose();
  }
}
