import { inject, Injectable } from '@angular/core';
import {
  CanActivateChild,
  GuardResult,
  MaybeAsync,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService implements CanActivateChild {
  private auth = inject(AuthService);
  private router = inject(Router);
  canActivateChild(): MaybeAsync<GuardResult> {
    return this.auth
      .isAuthenticated()
      .pipe(map((isLoggedIn) => isLoggedIn || this.router.createUrlTree([''])));
  }
}
