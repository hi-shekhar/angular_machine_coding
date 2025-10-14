import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Observable } from 'rxjs';
import { Project } from '../data/projects';
import { ProjectFilterComponent } from '../features/admin/project-filter/project-filter.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, ProjectFilterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private projectService = inject(ProjectService);

  protected projects$: Observable<Project[]> =
    this.projectService.filteredProjects$;
}
