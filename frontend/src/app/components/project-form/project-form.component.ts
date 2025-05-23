import { Component, EventEmitter, Output , Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent {
onCancel() {
throw new Error('Method not implemented.');
}
  form: FormGroup;
  selectedFile: File | null = null;
  message = '';

  @Output() projectUploaded = new EventEmitter<void>();
   @Input() userId!: number;

  constructor(private fb: FormBuilder, private projectService: ProjectService) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      technologies: ['', Validators.required],
      userId: [currentUser.id || null, Validators.required] // ❗ Dinamik olarak userId çekiliyor
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.form.valid && this.selectedFile) {
      const formData = new FormData();
      const projectData = {
        ...this.form.value,
        technologies: this.form.value.technologies
          .split(',')
          .map((tech: string) => tech.trim())
          .filter((t: string) => t.length > 0)
      };

      formData.append('project', new Blob([JSON.stringify(projectData)], { type: 'application/json' }));
      formData.append('image', this.selectedFile);

      this.projectService.uploadProject(formData).subscribe({
        next: () => {
          this.message = 'Proje yüklendiiii';
          this.form.reset();
          this.selectedFile = null;
          this.projectUploaded.emit();
        },
        error: () => {
          this.message = 'Hata oluştu';
        }
      });
    } else {
      this.message = 'Tüm alanlar zorunludur ve görsel seçilmelidir.';
    }
  }
}
