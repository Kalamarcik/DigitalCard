import { Component, Input } from '@angular/core';
import { JsonDataService } from '../../services/json-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-json-upload',
  templateUrl: './json-upload.component.html',
    standalone: true,
  imports: [CommonModule, FormsModule],
})
export class JsonUploadComponent {
  selectedFile: File | null = null;
  message = '';
 @Input() userId!: number;

  constructor(private jsonService: JsonDataService) {}


  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userId = currentUser?.id;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files && input.files.length > 0 ? input.files[0] : null;
  }

  upload(): void {
    if (!this.selectedFile) return;

    this.jsonService.importUserData(this.selectedFile).subscribe({
      next: (msg) => this.message = msg,
      error: () => this.message = 'Yükleme başarısız.'
    });
  }

  download(): void {
    if (this.userId > 0) {
      this.jsonService.exportUserData(this.userId);
    }
  }
}
