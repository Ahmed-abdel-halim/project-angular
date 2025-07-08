import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register1',
  imports: [ReactiveFormsModule,CommonModule,RouterModule ],
  templateUrl: './register1.component.html',
  styleUrls: ['./register1.component.css']
})
export class RegisterComponent1 {
  signupForm: FormGroup;
  errorMessage: string = '';
    loading = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
onSubmit(): void {
  if (this.signupForm.invalid) {
    return;
  }

  this.loading = true;
  const { name, email, password } = this.signupForm.value;

  this.authService.register({ name, email, password }).subscribe({
    next: () => {
      alert('Registration successful! Please login manually.');
      this.router.navigate(['/login']);
    },
    error: (error) => {
      alert(error.error.message || 'Registration failed');
      this.loading = false;
    },
    complete: () => {
      this.loading = false;
    }
  });
}
}
