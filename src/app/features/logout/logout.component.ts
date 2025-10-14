import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-logout',
  imports: [MatIconModule],
  template: `<div class="page-container">
    <h2 class="page-title">Logged Out</h2>
    <mat-icon> logout </mat-icon>
  </div>`,
})
export class LogoutComponent {}
