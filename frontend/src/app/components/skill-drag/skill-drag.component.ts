import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  id: number;
  name: string;
}

@Component({
  selector: 'app-skill-drag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-drag.component.html',
  styleUrls: ['./skill-drag.component.css']
})
export class SkillDragComponent implements OnInit {
  allSkills: Skill[] = [];
  selectedSkills: Skill[] = [];
  draggedSkill!: Skill;

  ngOnInit(): void {
    this.allSkills = [
      { id: 1, name: 'Java' },
      { id: 2, name: 'Angular' },
      { id: 3, name: 'Spring Boot' },
      { id: 4, name: 'Python' },
      { id: 5, name: 'TypeScript' },
    ];
  }

  onDragStart(event: DragEvent, skill: Skill): void {
    this.draggedSkill = skill;
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, target: 'selected' | 'pool'): void {
    event.preventDefault();

    if (target === 'selected') {
      const exists = this.selectedSkills.find(s => s.id === this.draggedSkill.id);
      if (!exists) {
        this.selectedSkills.push(this.draggedSkill);
      }
    } else if (target === 'pool') {
      this.selectedSkills = this.selectedSkills.filter(s => s.id !== this.draggedSkill.id);
    }
  }

  removeSkill(skill: Skill): void {
    this.selectedSkills = this.selectedSkills.filter(s => s.id !== skill.id);
  }
}
