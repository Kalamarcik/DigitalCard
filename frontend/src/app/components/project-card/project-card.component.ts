
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../services/project.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Input() editable: boolean = false; //  buton görünsün mü?
  @Output() edit = new EventEmitter<Project>();
triggerEdit(): void {
    this.edit.emit(this.project); // ← Project'i dışarıya fırlatıyoruz
  }

  
}
