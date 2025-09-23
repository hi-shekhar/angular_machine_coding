import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Angular Machine Coding Catalog',
  },
  {
    path: 'infinite-scroll',
    loadComponent: () =>
      import('./features/infinite-scroll/items-list/items-list.component').then(
        (c) => c.ItemsListComponent
      ),
    title: 'Infinite Scroll List',
  },
  {
    path: 'otp-input',
    loadComponent: () =>
      import('./features/otp-input/otp-input.component').then(
        (c) => c.OtpInputComponent
      ),
    title: 'Otp Input',
  },
  {
    path: 'star-rating',
    loadComponent: () =>
      import('./features/star-rating/star-rating.component').then(
        (c) => c.StarRatingComponent
      ),
    title: 'Star Rating',
  },
  {
    path: 'file-explorer',
    loadComponent: () =>
      import('./features/file-explorer/file-explorer.component').then(
        (c) => c.FileExplorerComponent
      ),
    title: 'Star Rating',
  },
  {
    path: 'loader',
    loadComponent: () =>
      import('./features/loader/loader.component').then(
        (c) => c.LoaderComponent
      ),
    title: 'Loader',
  },
  {
    path: 'typeahead',
    loadComponent: () =>
      import('./features/typeahead/typeahead.component').then(
        (c) => c.TypeaheadComponent
      ),
    title: 'Typeahead',
  },
  {
    path: 'stopwatch',
    loadComponent: () =>
      import('./features/stop-watch/stop-watch.component').then(
        (c) => c.StopWatchComponent
      ),
    title: 'Stop Watch',
  },
  {
    path: 'reactive-form',
    loadComponent: () =>
      import('./features/reactive-form/reactive-form.component').then(
        (c) => c.ReactiveFormComponent
      ),
    title: 'Reactive Form',
  },
  {
    path: 'dynamic',
    loadComponent: () =>
      import('./features/dynamic/dynamic.component').then(
        (c) => c.DynamicComponent
      ),
    title: 'dynamic',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
