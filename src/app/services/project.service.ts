import { Injectable } from '@angular/core';
import { projects, Project, TaskStatus } from '../data/projects';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private allProjects: Project[] = projects;

  private statusFilterSubject = new BehaviorSubject<string>('all');

  private projectFilterSubject = new BehaviorSubject<string[]>([]);

  syncedProjects$: Observable<Project[]> = this.statusFilterSubject.pipe(
    map((status) => {
      if (status === 'all') {
        return this.allProjects;
      } else {
        return this.allProjects.filter((project) => project.status === status);
      }
    })
  );

  public filteredProjects$: Observable<Project[]> = combineLatest([
    this.statusFilterSubject,
    this.projectFilterSubject,
  ]).pipe(
    map(([statusFilter, projectFilterIds]) => {
      let finalProjects = this.allProjects;
      if (statusFilter !== 'all') {
        finalProjects = finalProjects.filter((p) => p.status === statusFilter);
      }

      if (projectFilterIds.length > 0) {
        finalProjects = finalProjects.filter((p) =>
          projectFilterIds.includes(p.id)
        );
      }
      return finalProjects;
    })
  );

  updateFilterStatus(status: string) {
    this.statusFilterSubject.next(status);
  }

  updateProjectFilter(projectIds: string[]) {
    this.projectFilterSubject.next(projectIds);
  }
}
