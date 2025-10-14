import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, Observable, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private loggedInSubject = new BehaviorSubject<boolean>(true);

  isAuthenticated(): Observable<boolean> {
    return this.loggedInSubject.asObservable().pipe(delay(500));
  }

  authStatusChange$ = this.isAuthenticated().pipe(
    tap((status: boolean) => {
      if (status) {
        // Navigate to the main catalog page upon login
        this.router.navigate(['/']);
      } else {
        // Navigate to the logout page upon logout
        this.router.navigate(['/logout']);
      }
    })
  );

  public setLoginStatus(value: boolean) {
    this.loggedInSubject.next(value);
  }
}
