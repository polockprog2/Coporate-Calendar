import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarViewComponent } from './components/calendar-view/calendar-view.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarRoutingModule,
    CalendarViewComponent
  ]
})
export class CalendarModule { }
