import { inject, Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGaurdService implements CanActivate {
  private auth = inject(AuthService);
  private router = inject(Router);

  canActivate(): MaybeAsync<GuardResult> {
    return this.auth
      .isAuthenticated()
      .pipe(map((isLoggedIn) => isLoggedIn || this.router.createUrlTree([''])));
  }
}
