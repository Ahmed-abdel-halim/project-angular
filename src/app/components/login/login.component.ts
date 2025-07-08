import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
// import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  errorMessage: string = ''; // Add this property declaration

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Get return URL from route parameters or default to '/home'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  onSubmit(): void {
     this.errorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        alert('Login successful!');
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (error) => {
        alert(error.error.message || 'Login failed');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
