import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../data/projects';
import { ProjectService } from '../../services/project.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectFilterComponent } from '../admin/project-filter/project-filter.component';

@Component({
  selector: 'app-catalog',
  imports: [CommonModule, RouterLink, ProjectFilterComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent {
  private projectService = inject(ProjectService);

  protected projects$: Observable<Project[]> =
    this.projectService.filteredProjects$;
}
