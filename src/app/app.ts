import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgendaViewComponent } from './components/agenda-view/agenda-view.component';
import { MonthViewComponent } from './components/month-view/month-view.component';
import { WeekViewComponent } from './components/week-view/week-view.component';
import { DayViewComponent } from './components/day-view/day-view.component';
import { YearViewComponent } from './components/year-view/year-view.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { EventModalComponent } from './components/event-modal/event-modal.component';
import { EventDetailsModalComponent } from './components/event-details-modal/event-details-modal.component';
import { UserProfileModalComponent } from './components/user-profile-modal/user-profile-modal.component';
import { ToastComponent } from './components/ui/toast.component';
import { SettingsModalComponent, CalendarSettings } from './components/settings-modal/settings-modal.component';
import { CalendarService } from './services/calendar.service';
import { ToastService } from './services/toast.service';
import { DragDropService } from './services/drag-drop.service';
import { CalendarView, CalendarEvent, Category, Label } from './types/calendar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    CalendarHeaderComponent,
    MonthViewComponent,
    WeekViewComponent,
    DayViewComponent,
    YearViewComponent,
    AgendaViewComponent,
    EventModalComponent,
    EventDetailsModalComponent,
    UserProfileModalComponent,
    ToastComponent,
    SettingsModalComponent
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  currentDate = new Date();
  view: CalendarView = 'month';
  events: CalendarEvent[] = [];
  selectedCategory: string | null = null;
  searchQuery = '';
  
  // Modal states
  isEventModalOpen = false;
  isEventDetailsModalOpen = false;
  isProfileModalOpen = false;
  isSettingsModalOpen = false;
  selectedEvent: CalendarEvent | null = null;
  selectedDate: Date | undefined;
  modalType: 'event' | 'task' | 'venue' = 'event';

  settings: CalendarSettings = {
    defaultView: 'month',
    showWeekends: true,
    showEventTimes: true,
    timeFormat: '12h',
    startOfWeek: 'sunday'
  };

  mockCategories: Category[] = [
    { id: '1', name: 'Work', color: '#3b82f6' },
    { id: '2', name: 'Personal', color: '#10b981' },
    { id: '3', name: 'Health', color: '#ef4444' },
    { id: '4', name: 'Education', color: '#f59e0b' },
    { id: '5', name: 'Social', color: '#8b5cf6' },
    { id: '6', name: 'Finance', color: '#06b6d4' }
  ];

  mockLabels: Label[] = [
    { id: '1', name: 'Important', color: '#ef4444' },
    { id: '2', name: 'Follow-up', color: '#f59e0b' },
    { id: '3', name: 'Review', color: '#3b82f6' }
  ];

  filteredEvents: CalendarEvent[] = [];

  constructor(
    private calendarService: CalendarService,
    private toastService: ToastService,
    private dragDropService: DragDropService
  ) {}

  ngOnInit() {
    const savedSettings = localStorage.getItem('calendarSettings');
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
      this.view = this.settings.defaultView;
    }
    
    this.events = this.calendarService.generateMockEvents();
    this.updateFilteredEvents();
    this.toastService.show('Welcome to TsCalendar! 📅', 'info', 2000);
  }

  handleNavigate(direction: 'prev' | 'next') {
    this.currentDate = this.calendarService.navigateDate(this.currentDate, this.view, direction);
  }

  handleToday() {
    this.currentDate = new Date();
  }

  handleAddEvent(type: 'event' | 'task' | 'venue') {
    this.modalType = type;
    this.selectedEvent = null;
    this.selectedDate = undefined;
    this.isEventModalOpen = true;
  }

  handleDateClick(date: Date) {
    this.selectedDate = date;
    this.modalType = 'event';
    this.selectedEvent = null;
    this.isEventModalOpen = true;
  }

  handleEventClick(event: CalendarEvent) {
    this.selectedEvent = event;
    this.isEventDetailsModalOpen = true;
  }

  handleSaveEvent(eventData: Omit<CalendarEvent, 'id'>) {
    if (this.selectedEvent) {
      this.events = this.events.map(e => 
        e.id === this.selectedEvent!.id 
          ? { ...eventData, id: this.selectedEvent!.id } as CalendarEvent
          : e
      );
      this.toastService.show('Event updated successfully! ✓', 'success');
    } else {
      const newEvent: CalendarEvent = {
        ...eventData,
        id: Date.now().toString()
      };
      this.events = [...this.events, newEvent];
      this.toastService.show('Event created successfully! ✓', 'success');
    }
    this.isEventModalOpen = false;
    this.updateFilteredEvents();
  }

  handleEventMoved(data: { event: CalendarEvent; newDate: Date }) {
    const duration = data.event.endDate.getTime() - data.event.startDate.getTime();
    const newEndDate = new Date(data.newDate.getTime() + duration);
    
    this.events = this.events.map(e =>
      e.id === data.event.id
        ? { ...e, startDate: data.newDate, endDate: newEndDate }
        : e
    );
    this.updateFilteredEvents();
    this.toastService.show('Event moved successfully! ✓', 'success');
  }

  handleEventCreated(data: { date: Date; hour: number }) {
    this.selectedDate = new Date(data.date);
    this.selectedDate.setHours(data.hour, 0, 0, 0);
    this.handleAddEvent('event');
  }

  handleEditEvent(event: CalendarEvent) {
    this.selectedEvent = event;
    this.modalType = event.type;
    this.isEventModalOpen = true;
    this.isEventDetailsModalOpen = false;
  }

  handleDeleteEvent(eventId: string) {
    this.events = this.events.filter(e => e.id !== eventId);
    this.updateFilteredEvents();
    this.isEventDetailsModalOpen = false;
    this.toastService.show('Event deleted successfully! ✓', 'info');
  }

  handleToggleTask(eventId: string) {
    this.events = this.events.map(e =>
      e.id === eventId ? { ...e, isCompleted: !e.isCompleted } : e
    );
    this.updateFilteredEvents();
  }

  handleSettingsSave(settings: CalendarSettings) {
    this.settings = settings;
    localStorage.setItem('calendarSettings', JSON.stringify(settings));
    this.view = settings.defaultView;
    this.isSettingsModalOpen = false;
    this.toastService.show('Settings saved successfully! ✓', 'success');
  }

  updateFilteredEvents() {
    this.filteredEvents = this.events.filter(event => {
      const matchesCategory = !this.selectedCategory || event.category === this.selectedCategory;
      const matchesSearch = !this.searchQuery || 
        event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
}
