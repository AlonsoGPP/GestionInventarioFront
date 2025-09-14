import { provideRouter, withEnabledBlockingInitialNavigation, withRouterConfig } from '@angular/router';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthRepository } from './features/auth/domain';
import { AuthService } from './features/auth/infrastructure/services/auth.service';
import { provideStore } from '@ngrx/store';
import { AuthEffects, authFeatureKey, authReducer } from './core/state/auth';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withEnabledBlockingInitialNavigation(),  withRouterConfig({ onSameUrlNavigation: 'reload' })),
     provideHttpClient(
      withInterceptors([authInterceptor]), 
    ),
    { provide: AuthRepository, useClass: AuthService },
    provideStore({
        [authFeatureKey]: authReducer,
    }),
    provideEffects([ AuthEffects]),
  ]
};
