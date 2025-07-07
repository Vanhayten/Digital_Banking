import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="app-container">
      <!-- Global Loading Spinner -->
      <div *ngIf="loadingService.loading$ | async" 
           class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <mat-spinner diameter="50" color="primary"></mat-spinner>
      </div>

      <!-- Main Content -->
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
  `]
})
export class AppComponent {
  title = 'Digital Banking';

  constructor(public loadingService: LoadingService) {}
}