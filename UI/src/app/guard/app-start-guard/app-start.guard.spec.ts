import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { appStartGuard } from './app-start.guard';

describe('appStartGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => appStartGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
