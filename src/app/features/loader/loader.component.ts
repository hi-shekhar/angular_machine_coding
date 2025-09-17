import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container">
      <a routerLink="/" class="back-link">&larr; Back to Catalog</a>
      <div class="loaders">
        <div class="progress-loader"></div>
        <div class="spinner"></div>
        <div class="progress-ball"></div>
      </div>
    </div>
  `,
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {}
