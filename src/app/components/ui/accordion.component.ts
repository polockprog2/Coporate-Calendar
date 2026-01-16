import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export interface AccordionItem {
  title: string;
  content: string;
  open: boolean;
  id?: string;
}

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <div class="accordion">
      <div
        class="item"
        *ngFor="let item of items; let i = index"
      >
        <button 
          class="trigger" 
          (click)="toggle(item)"
          [attr.aria-expanded]="item.open"
          [attr.aria-controls]="'content-' + (item.id || i)"
        >
          {{ item.title }}
          <span class="chevron" [class.open]="item.open">⌄</span>
        </button>

        <div 
          class="content" 
          *ngIf="item.open"
          [attr.id]="'content-' + (item.id || i)"
        >
          {{ item.content }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .item {
      border-bottom: 1px solid #e5e7eb;
    }

    .trigger {
      width: 100%;
      padding: 1rem;
      background: none;
      border: none;
      text-align: left;
      font-weight: 500;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
    }

    .chevron {
      transition: transform 0.2s ease;
    }

    .chevron.open {
      transform: rotate(180deg);
    }

    .content {
      padding: 0 1rem 1rem;
      font-size: 0.875rem;
    }
  `]
})
export class AccordionComponent {
  @Input() items: AccordionItem[] = [
    {
      title: 'What is TsCalendar?',
      content: 'A modern Angular calendar system.',
      open: false
    },
    {
      title: 'Does it support SSR?',
      content: 'Yes, Angular 21 SSR is supported.',
      open: false
    }
  ];

  toggle(item: AccordionItem) {
    item.open = !item.open;
  }
}
