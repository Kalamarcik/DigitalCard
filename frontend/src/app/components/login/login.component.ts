import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.http.post('http://192.168.1.69:8080/api/auth/login', this.form.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', JSON.stringify(res?.token));
          localStorage.setItem('currentUser', JSON.stringify(res?.user));
          this.router.navigate(['/profile']);
        },
        error: () => {
          this.errorMessage = 'Geçersiz e-posta veya şifre';
        }
      });
    }
  }
}
