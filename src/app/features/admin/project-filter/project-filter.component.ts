import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FilterTaskStatus, Project } from '../../../data/projects';
import { ProjectService } from '../../../services/project.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-filter',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './project-filter.component.html',
  styleUrl: './project-filter.component.scss',
})
export class ProjectFilterComponent {
  private projectService = inject(ProjectService);

  statuses: FilterTaskStatus[] = ['All', 'Completed', 'InProgress', 'Pending'];
  syncedProjects$: Observable<Project[]> = this.projectService.syncedProjects$;

  currentStatus$ = this.projectService.currentStatus$;
  currentProjectIds$ = this.projectService.currentProjectIds$;

  onStatusChange(status: FilterTaskStatus) {
    this.projectService.updateFilterStatus(status);
  }

  onProjectSelect(projectIds: string[]) {
    this.projectService.updateProjectFilter(projectIds);
  }
}
