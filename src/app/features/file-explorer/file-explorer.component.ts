import { Component , signal, OnInit} from '@angular/core';
import { FileNode, MOCK_FILE_SYSTEM } from './file-explorer.constants';
import { RouterLink } from '@angular/router';
import { FileNodeComponent } from './file-node/file-node.component';

@Component({
  selector: 'app-file-explorer',
  imports: [RouterLink, FileNodeComponent],
  templateUrl: './file-explorer.component.html',
  styleUrl: './file-explorer.component.scss'
})
export class FileExplorerComponent {
  fileSystem = signal<FileNode[]>([]);

  constructor() { }

  ngOnInit(): void {
    this.fileSystem.set(MOCK_FILE_SYSTEM);
  }
}
