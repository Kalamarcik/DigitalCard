import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillService, Skill } from '../../services/skill.service';
import { SkillDragFormComponent } from '../skill-drag-form/skill-drag-form.component';

@Component({
    selector: 'app-skill-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './skill-form.component.html',
    styleUrls: ['./skill-form.component.css']
})
export class SkillFormComponent implements OnInit {
    @Input() userId!: number;
    @Input() existingSkill?: Skill;
    @Output() skillSaved = new EventEmitter<void>();
    @Output() cancelled = new EventEmitter<void>();

    form!: FormGroup;

    constructor(private fb: FormBuilder, private skillService: SkillService) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: [this.existingSkill?.name || '', Validators.required],
            level: [this.existingSkill?.level || 1, [Validators.required, Validators.min(1), Validators.max(5)]]
        });
    }

    submit(): void {

        const formValue = this.form.value as Omit<Skill, 'id'>;
        const skill: Skill = {
            ...(this.existingSkill || { id: 0 }),
            name: formValue.name,
            level: formValue.level,
            userId: this.userId
        };

        const request$ = this.existingSkill
            ? this.skillService.updateSkill(this.existingSkill.id, skill)
            : this.skillService.addSkill(skill);

        request$.subscribe({
            next: () => this.skillSaved.emit(),
            error: (err) => console.error('Skill kaydedilemedi', err)
        });
    }

    cancel(): void {
        this.cancelled.emit();
    }
}
