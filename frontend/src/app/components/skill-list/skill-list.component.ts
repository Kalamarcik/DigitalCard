// src/app/components/skill-list/skill-list.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillService, Skill } from '../../services/skill.service';
import { SkillFormComponent } from '../skill-form/skill-form.component';
import { User } from '../../services/user.service';
import { SkillDragFormComponent } from '../skill-drag-form/skill-drag-form.component';
import { SelectedSkill } from '../skill-drag-form/skill-drag-form.component';

@Component({
    selector: 'app-skill-list',
    standalone: true,
    imports: [CommonModule, SkillFormComponent, SkillDragFormComponent],
    templateUrl: './skill-list.component.html',
    styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {
    @Input() userId!: number;
    @Input() editable!: boolean;

    skills: Skill[] = [];

    showSkillModal = false;
    selectedSkill: Skill | undefined = undefined;

    constructor(private skillService: SkillService) { }

    ngOnInit(): void {
        this.skillService.getSkillsByUserId(this.userId).subscribe({
            next: (data) => (this.skills = data),
            error: (err) => console.error('Skill verisi alınamadı:', err)
        });
        this.loadSkills();
    }

    openAddSkillModal(): void {
        this.selectedSkill = undefined;
        this.showSkillModal = true;
    }

    openEditSkillModal(skill: Skill): void {
        this.selectedSkill = skill;
        this.showSkillModal = true;
    }

    closeSkillModal(): void {
        this.showSkillModal = false;
    }

    onSkillSaved(): void {
        this.closeSkillModal();
        this.loadSkills();
    }

    getStars(level: number): number[] {
        return Array(5).fill(0).map((_, i) => i < level ? 1 : 0);
    }

    deleteSkill(id: number): void {
        if (confirm('Bu yeteneği silmek istediğinizden emin misiniz?')) {
            this.skillService.deleteSkill(id).subscribe({
                next: () => {
                    this.skills = this.skills.filter(skill => skill.id !== id);
                },
                error: err => console.error('Silme işlemi başarısız:', err)
            });
        }
    }

    loadSkills(): void {
        this.skillService.getSkillsByUserId(this.userId).subscribe({
            next: (data) => (this.skills = data),
            error: (err) => console.error('Skill verisi alınamadı:', err)
        });
    }

    onSkillsSaved(skills: SelectedSkill[]): void {
        const payload = skills.map(s => ({
            name: s.name,
            level: s.level,
            userId: this.userId
        }));

        this.skillService.saveSkillList(payload).subscribe({
            next: () => {
                this.closeSkillModal();
                this.loadSkills(); // güncelle
            },
            error: err => console.error('Toplu kayıt hatası', err)
        });
    }

}
