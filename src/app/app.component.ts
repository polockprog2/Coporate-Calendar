import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { AuthService } from './core/services/auth.service';
import { User } from './core/models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <div class="main-content">
        <app-sidebar></app-sidebar>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    
    .main-content {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
  `]
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: 'john@company.com',
      role: 'admin',
      teamId: 'team1'
    };
    this.authService.setCurrentUser(mockUser);
  }
}
