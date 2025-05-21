import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service'; // ✅ eklendi

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent {
  form: FormGroup;
  selectedFile: File | null = null;
  message = '';

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private userService: UserService // ✅ eklendi
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      technologies: ['', Validators.required],
      // ❌ userId burada artık sabit değil, submit anında eklenecek
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.form.valid && this.selectedFile) {
      const currentUser = this.userService.getCurrentUser(); // ✅ user'ı al

      const formData = new FormData();
      const projectData = {
        ...this.form.value,
        userId: currentUser.id, // ✅ dinamik userId
        technologies: this.form.value.technologies
          .split(',')
          .map((tech: string) => tech.trim())
          .filter((t: string) => t.length > 0)
      };

      formData.append('project', new Blob([JSON.stringify(projectData)], { type: 'application/json' }));
      formData.append('image', this.selectedFile);

      this.projectService.uploadProject(formData).subscribe({
        next: () => {
          this.message = 'Proje başarıyla yüklendi!';
          this.form.reset();
          this.selectedFile = null;
        },
        error: () => {
          this.message = 'Hata oluştu. Lütfen tekrar deneyin.';
        }
      });
    } else {
      this.message = 'Lütfen gerekli tüm alanları doldurun ve görsel seçin.';
    }
  }
}
