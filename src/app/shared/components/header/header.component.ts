import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="logo">📅 Corporate Calendar</div>
      <nav class="nav">
        <a routerLink="/calendar" routerLinkActive="active">Calendar</a>
        <a routerLink="/tasks" routerLinkActive="active">Tasks</a>
        <a routerLink="/chat" routerLinkActive="active">Team Chat</a>
      </nav>
      <div class="user-menu" *ngIf="currentUser$ | async as user">
        <span>{{ user.name }}</span>
        <button (click)="logout()" class="logout-btn">Logout</button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      padding: 1rem 2rem;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      margin-right: 2rem;
      letter-spacing: 0.5px;
    }
    .nav {
      display: flex;
      gap: 1.5rem;
      flex: 1;
    }
    .nav a {
      color: #ccc;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: all 0.3s ease;
      font-weight: 500;
    }
    .nav a:hover {
      color: white;
      background: rgba(255,255,255,0.1);
    }
    .nav a.active {
      color: white;
      background: #3498db;
    }
    .user-menu {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-left: auto;
    }
    .logout-btn {
      padding: 0.5rem 1rem;
      background: #e74c3c;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.3s;
    }
    .logout-btn:hover {
      background: #c0392b;
    }
  `]
})
export class HeaderComponent implements OnInit {
  currentUser$!: Observable<User | null>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
