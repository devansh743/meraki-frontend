import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="login-header">
          <div class="logo-icon">
            <i class="fa-solid fa-truck-fast"></i>
          </div>
          <h2>Admin Access</h2>
          <p>Please enter your credentials to manage Meraki.</p>
        </div>
        
        <form (ngSubmit)="onLogin()">
          <div class="form-group">
            <label>Password</label>
            <div class="input-wrapper">
              <i class="fa-solid fa-lock"></i>
              <input 
                type="password" 
                [(ngModel)]="password" 
                name="password" 
                placeholder="Enter admin password"
                required
              >
            </div>
          </div>
          
          <button type="submit" class="login-btn" [disabled]="!password || isLoading">
            {{ isLoading ? 'Signing In...' : 'Sign In' }} 
            <i class="fa-solid" [ngClass]="isLoading ? 'fa-spinner fa-spin' : 'fa-arrow-right'"></i>
          </button>
          
          <p *ngIf="error" class="error-msg">{{error}}</p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at top right, #f0fdfa, #f8fafc);
      padding: 20px;
    }
    .login-card {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 3rem;
      border-radius: 2.5rem;
      width: 100%;
      max-width: 450px;
      shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.05);
      text-align: center;
      animation: cardEntry 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    @keyframes cardEntry {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .login-header h2 {
      font-family: 'Outfit', sans-serif;
      font-weight: 900;
      font-size: 2rem;
      color: #0f172a;
      margin-bottom: 0.5rem;
    }
    .login-header p {
      color: #64748b;
      font-size: 0.95rem;
      margin-bottom: 2.5rem;
    }
    .logo-icon {
      width: 60px;
      height: 60px;
      background: #14b8a6;
      color: white;
      border-radius: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin: 0 auto 1.5rem;
      box-shadow: 0 10px 20px rgba(20, 184, 166, 0.3);
    }
    .form-group {
      text-align: left;
      margin-bottom: 1.5rem;
    }
    .form-group label {
      display: block;
      font-weight: 700;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #475569;
      margin-bottom: 0.75rem;
    }
    .input-wrapper {
      position: relative;
    }
    .input-wrapper i {
      position: absolute;
      left: 1.25rem;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
    }
    .input-wrapper input {
      width: 100%;
      padding: 1.25rem 1.25rem 1.25rem 3.5rem;
      background: white;
      border: 2px solid #f1f5f9;
      border-radius: 1rem;
      outline: none;
      transition: all 0.3s ease;
      font-weight: 500;
    }
    .input-wrapper input:focus {
      border-color: #14b8a6;
      box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.1);
    }
    .login-btn {
      width: 100%;
      padding: 1.25rem;
      background: #0f172a;
      color: white;
      border: none;
      border-radius: 1rem;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-top: 1rem;
    }
    .login-btn:hover {
      background: #14b8a6;
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(20, 184, 166, 0.3);
    }
    .error-msg {
      color: #ef4444;
      font-size: 0.85rem;
      margin-top: 1rem;
      font-weight: 600;
    }
  `]
})
export class LoginComponent {
  password = '';
  error = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.password) return;
    
    this.error = '';
    this.isLoading = true;
    this.authService.login(this.password).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.authenticated) {
          sessionStorage.setItem('isAdmin', 'true');
          this.router.navigate(['/admin-panel']);
        } else {
          this.error = 'Access denied. Please check your password.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login error:', err);
        this.error = 'Invalid admin password. Please try again.';
      }
    });
  }
}
