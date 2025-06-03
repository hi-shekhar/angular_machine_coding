import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemsListComponent } from './features/infinite-scroll/items-list/items-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Machine Coding Catalog'
  },
  {
    path: 'infinite-scroll',
    component: ItemsListComponent,
    title: 'Infinite Scroll List'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];