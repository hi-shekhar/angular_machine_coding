import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';
import { Subject, throttleTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly THROTTLE_TIME_MS = 500;

  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly loginClick$ = new Subject<void>();
  private readonly logoutClick$ = new Subject<void>();

  readonly loginStatus$ = this.auth.authStatusChange$;

  title = 'Machine Coding Catalog';

  constructor() {
    this.loginClick$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        throttleTime(this.THROTTLE_TIME_MS)
      )
      .subscribe(() => {
        this.auth.setLoginStatus(true);
      });

    this.logoutClick$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        throttleTime(this.THROTTLE_TIME_MS)
      )
      .subscribe(() => {
        this.auth.setLoginStatus(false);
      });
  }

  handleLogin() {
    this.loginClick$.next();
  }

  handleLogout() {
    this.logoutClick$.next();
  }
}
