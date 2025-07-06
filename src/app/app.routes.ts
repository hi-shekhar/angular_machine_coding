import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemsListComponent } from './features/infinite-scroll/items-list/items-list.component';
import { OtpInputComponent } from './features/otp-input/otp-input.component';
import { StarRatingComponent } from './features/star-rating/star-rating.component';
import { FileExplorerComponent } from './features/file-explorer/file-explorer.component';
import { LoaderComponent } from './features/loader/loader.component';
import { TypeaheadComponent } from './features/typeahead/typeahead.component';

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
    path: 'otp-input',
    component: OtpInputComponent,
    title: 'Otp Input Component'
  },
  {
    path: 'star-rating',
    component: StarRatingComponent,
    title: 'Star Rating Component'
  },
  {
    path: 'file-explorer',
    component: FileExplorerComponent,
    title: 'Star Rating Component'
  },
  {
    path:'loader',
    component: LoaderComponent,
    title: 'Loader Component',
  },
  {
    path:'typeahead',
    component: TypeaheadComponent,
    title: 'Typeahead Component',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];