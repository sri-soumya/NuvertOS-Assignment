import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export function noAuthGuard(): CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (!authService.isAuthenticated()) {
      return true;
    }
    router.navigate(['/compounds']);
    return false;
  };
}
