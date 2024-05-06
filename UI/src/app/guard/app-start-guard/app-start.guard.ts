import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const appStartGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const currentRoute = state.url;

  if (!currentRoute.includes('get-started')) {
    router.navigateByUrl('/app/get-started');
    return false;
  }
  return true;
};
