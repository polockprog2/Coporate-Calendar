import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/calendar', 
    pathMatch: 'full' 
  },
  { 
    path: 'calendar', 
    loadChildren: () => import('./features/calendar/calendar.module')
      .then(m => m.CalendarModule) 
  },
  { 
    path: 'tasks', 
    loadChildren: () => import('./features/tasks/tasks.module')
      .then(m => m.TasksModule) 
  },
  { 
    path: 'chat', 
    loadChildren: () => import('./features/team-chat/team-chat.module')
      .then(m => m.TeamChatModule) 
  }
];
