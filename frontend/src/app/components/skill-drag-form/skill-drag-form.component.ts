import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Skill {
  id: number;
  name: string;
}

export interface SelectedSkill {
  id: number;
  name: string;
  level: number;
}

@Component({
  selector: 'app-skill-drag-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skill-drag-form.component.html',
  styleUrls: ['./skill-drag-form.component.css']
})
export class SkillDragFormComponent implements OnInit {
  @Input() userId!: number;
  @Output() skillsSaved = new EventEmitter<SelectedSkill[]>();
  @Output() cancelled = new EventEmitter<void>();

  allSkills: Skill[] = [];
  selectedSkills: SelectedSkill[] = [];
  draggedSkill!: Skill;

  ngOnInit(): void {
    this.allSkills = [
  { id: 1, name: 'Java' },
  { id: 2, name: 'Teamwork' },
  { id: 3, name: 'Angular' },
  { id: 4, name: 'Problem Solving' },
  { id: 5, name: 'Python' },
  { id: 6, name: 'Communication Skills' },
  { id: 7, name: 'TypeScript' },
  { id: 8, name: 'Adaptability' },
  { id: 9, name: 'React' },
  { id: 10, name: 'Critical Thinking' },
  { id: 11, name: 'Spring Boot' },
  { id: 12, name: 'Leadership' },
  { id: 13, name: 'HTML' },
  { id: 14, name: 'Clean Code' },
  { id: 15, name: 'CSS' },
  { id: 16, name: 'Scrum' },
  { id: 17, name: 'Docker' },
  { id: 18, name: 'Continuous Learning' },
  { id: 19, name: 'MySQL' },
  { id: 20, name: 'Time Management' },
  { id: 21, name: 'Node.js' },
  { id: 22, name: 'Git' },
  { id: 23, name: 'MongoDB' },
  { id: 24, name: 'Creativity' },
  { id: 25, name: 'Vue.js' },
  { id: 26, name: 'AWS' },
  { id: 27, name: 'System Design' },
  { id: 28, name: 'TDD (Test Driven Development)' },
  { id: 29, name: 'Kubernetes' },
  { id: 30, name: 'CI/CD' },
  { id: 31, name: 'Linux' },
  { id: 32, name: 'REST API' },
  { id: 33, name: 'Empathy' },
  { id: 34, name: 'Express.js' },
  { id: 35, name: 'Agile Methodologies' },
  { id: 36, name: 'Presentation Skills' },
  { id: 37, name: 'Debugging' },
  { id: 38, name: 'Conflict Resolution' },
  { id: 39, name: 'GraphQL' },
  { id: 40, name: 'Django' },
  { id: 41, name: 'Code Review' },
  { id: 42, name: 'Flask' },
  { id: 43, name: 'PostgreSQL' },
  { id: 44, name: 'Version Control' },
  { id: 45, name: 'Documentation' },
  { id: 46, name: '.NET Core' },
  { id: 47, name: 'Multitasking' },
  { id: 48, name: 'Goal-Oriented' },
  { id: 49, name: 'Resilience' },
  { id: 50, name: 'Open to Feedback' }
];

  }

  onDragStart(event: DragEvent, skill: Skill): void {
    this.draggedSkill = skill;
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();

    const exists = this.selectedSkills.find(s => s.id === this.draggedSkill.id);
    if (!exists) {
      this.selectedSkills.push({ ...this.draggedSkill, level: 1 });
    }
  }

  removeSkill(skill: SelectedSkill): void {
    this.selectedSkills = this.selectedSkills.filter(s => s.id !== skill.id);
  }

  saveSkills(): void {
    this.skillsSaved.emit(this.selectedSkills);
  }
}
