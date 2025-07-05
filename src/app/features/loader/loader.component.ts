import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderType } from '../../shared/types'


@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    @if (isLoading) {
  <div class="page-container">
      @switch (type) {
        @case ('Progress') {
          <div class="progress-loader"></div>
        }
        @case ('Progress-Ball') {
          <div class="progress-ball"></div>
        }
        @default {
          <div class="spinner"></div>
        }
      }
  </div> }
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() isLoading = false;
  @Input() type: LoaderType = 'Basic';
}