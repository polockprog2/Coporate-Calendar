import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskBoardComponent } from './components/task-board/task-board.component';

@NgModule({
  imports: [
    CommonModule,
    TasksRoutingModule,
    TaskBoardComponent
  ]
})
export class TasksModule { }
