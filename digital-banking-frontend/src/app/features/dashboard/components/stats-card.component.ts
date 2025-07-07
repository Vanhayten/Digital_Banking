import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card class="stats-card" [ngClass]="'stats-card-' + color">
      <mat-card-content class="p-6">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-600 mb-1">{{ title }}</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ prefix }}{{ formattedValue }}
            </p>
            <div class="flex items-center mt-2" *ngIf="trend">
              <mat-icon class="text-green-500 text-sm mr-1">trending_up</mat-icon>
              <span class="text-sm text-green-600 font-medium">+{{ trend }}%</span>
              <span class="text-sm text-gray-500 ml-1">{{ trendLabel }}</span>
            </div>
          </div>
          <div class="icon-container" [ngClass]="'bg-' + color + '-100'">
            <mat-icon [ngClass]="'text-' + color + '-600'">{{ icon }}</mat-icon>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .stats-card {
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
      border-left: 4px solid transparent;
    }

    .stats-card:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    .stats-card-blue {
      border-left-color: #3b82f6;
    }

    .stats-card-green {
      border-left-color: #10b981;
    }

    .stats-card-purple {
      border-left-color: #8b5cf6;
    }

    .stats-card-orange {
      border-left-color: #f59e0b;
    }

    .icon-container {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bg-blue-100 { background-color: #dbeafe; }
    .bg-green-100 { background-color: #dcfce7; }
    .bg-purple-100 { background-color: #e9d5ff; }
    .bg-orange-100 { background-color: #fed7aa; }

    .text-blue-600 { color: #2563eb; }
    .text-green-600 { color: #059669; }
    .text-purple-600 { color: #7c3aed; }
    .text-orange-600 { color: #d97706; }
  `]
})
export class StatsCardComponent {
  @Input() title = '';
  @Input() value: number = 0;
  @Input() icon = '';
  @Input() color = 'blue';
  @Input() trend?: number;
  @Input() trendLabel = '';
  @Input() prefix = '';

  get formattedValue(): string {
    if (this.value >= 1000000) {
      return (this.value / 1000000).toFixed(1) + 'M';
    } else if (this.value >= 1000) {
      return (this.value / 1000).toFixed(1) + 'K';
    }
    return this.value.toLocaleString();
  }
}