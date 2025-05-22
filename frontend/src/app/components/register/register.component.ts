import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  errorMessage = '';
message: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      avatarUrl: ['']
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.http.post('http://localhost:8080/api/auth/register', this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
        },
        error: () => {
          this.errorMessage = 'Kayıt başarısız. Lütfen tekrar deneyin.';
        }
      });
    }
  }
}
