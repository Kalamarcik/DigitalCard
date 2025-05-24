// src/app/components/profile-edit/profile-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  form!: FormGroup;
  userId!: number;
  message = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      this.router.navigate(['/auth/login']);
      return;
    }
    const user = JSON.parse(storedUser);
    this.userId = user.id;

    this.form = this.fb.group({
      fullName: [user.fullName || '', Validators.required],
      bio: [user.bio || ''],
      avatarUrl: [user.avatarUrl || ''],
      socialMediaList: this.fb.array([])
    });

    if (user.socialMediaList && Array.isArray(user.socialMediaList)) {
      user.socialMediaList.forEach((s: any) => {
        this.socialMediaList.push(this.fb.group({
          id: [s.id],
          platform: [s.platform, Validators.required],
          url: [s.url, Validators.required]
        }));
      });
    }
  }

  get socialMediaList(): FormArray {
    return this.form.get('socialMediaList') as FormArray;
  }

  addSocialMedia(): void {
    this.socialMediaList.push(
      this.fb.group({
        id: [null],
        platform: ['', Validators.required],
        url: ['', Validators.required]
      })
    );
  }

  removeSocialMedia(index: number): void {
    this.socialMediaList.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updateData = {
        ...this.form.value,
        id: this.userId
      };
      this.http.put(`http://192.168.1.69:8080/api/users/${this.userId}`, updateData).subscribe({
        next: (updatedUser) => {
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          this.message = 'Profil güncellendi!';
        },
        error: () => {
          this.message = 'Güncelleme başarısız oldu.';
        }
      });
    }
  }
}
