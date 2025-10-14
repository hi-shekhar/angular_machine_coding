import { Injectable } from '@angular/core';
import { projects, Project, FilterTaskStatus } from '../data/projects';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private allProjects: Project[] = projects;

  private statusFilterSubject = new BehaviorSubject<FilterTaskStatus>('All');

  private projectFilterSubject = new BehaviorSubject<string[]>([]);

  public currentStatus$: Observable<FilterTaskStatus> =
    this.statusFilterSubject.asObservable();

  public currentProjectIds$: Observable<string[]> =
    this.projectFilterSubject.asObservable();

  syncedProjects$: Observable<Project[]> = this.statusFilterSubject.pipe(
    map((status) => {
      if (status === 'All') {
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
      if (statusFilter !== 'All') {
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

  updateFilterStatus(status: FilterTaskStatus) {
    this.statusFilterSubject.next(status);
  }

  updateProjectFilter(projectIds: string[]) {
    this.projectFilterSubject.next(projectIds);
  }
}
