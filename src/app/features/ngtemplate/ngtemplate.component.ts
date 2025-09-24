import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="list-container">
    @for (item of items; track $index) {
    <ng-container
      [ngTemplateOutlet]="itemTemplate"
      [ngTemplateOutletContext]="{ $implicit: item, isEven: $index % 2 === 0 }"
    >
    </ng-container>
    }
  </div>`,
  styles: [
    `
      .list-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        border: 1px dashed #b0c4de;
        border-radius: 8px;
        background-color: #fafafa;
      }
    `,
  ],
})
export class ListComponent {
  // Receives the data to display
  @Input() items: any[] = [];

  // Receives the template blueprint from the parent
  @Input() itemTemplate!: TemplateRef<any>;
}

@Component({
  selector: 'app-ngtemplate',
  imports: [ListComponent, RouterLink],
  templateUrl: './ngtemplate.component.html',
  styleUrl: './ngtemplate.component.scss',
})
export class NgtemplateComponent {
  users = [
    { id: 1, name: 'Alice', role: 'Developer' },
    { id: 2, name: 'Bob', role: 'Designer' },
    { id: 3, name: 'Charlie', role: 'Manager' },
  ];
}
