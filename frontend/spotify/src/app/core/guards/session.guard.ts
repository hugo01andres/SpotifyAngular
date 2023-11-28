import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const sessionGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const token = cookieService.check('token');
  if (token) {
    return true;
  }
  router.navigate(['/auth/login']);
  return false;
};
