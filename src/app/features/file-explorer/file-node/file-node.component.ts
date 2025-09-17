import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileNode } from '../file-explorer.constants';

@Component({
  selector: 'app-file-node',
  imports: [
    CommonModule,
    // IMPORTANT: Self-import for recursion.
    // This will allow <app-file-node> to be used within its own template.
    FileNodeComponent,
  ],
  templateUrl: './file-node.component.html',
  styleUrls: ['./file-node.component.scss'],
})
export class FileNodeComponent {
  @Input() node!: FileNode;
  @Input() level: number = 0;

  isExpanded = signal<boolean>(false);

  toggleExpand(): void {
    if (
      this.node.type === 'folder' &&
      this.node.children &&
      this.node.children.length > 0
    ) {
      this.isExpanded.update((value) => !value);
    }
  }
}
