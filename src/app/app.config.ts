import { provideRouter, withEnabledBlockingInitialNavigation, withRouterConfig } from '@angular/router';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthRepository } from './features/auth/domain';
import { AuthService } from './features/auth/infrastructure/services/auth.service';
import { provideStore } from '@ngrx/store';
import { AuthEffects, authFeatureKey, authReducer } from './core/state';
import { provideEffects } from '@ngrx/effects';
import { ProductoRepository } from './features/products/domain/repository/produt.repository';
import { ProductService } from './features/products/infrastructure/services/product.service';
import { productReducer, productsFeatureKey } from './core/state/products/products.reducer';
import { ProductEffects } from './core/state/products/products.effects';
import { UserRepository } from './features/users/domain/repository/user.repository';
import { UserService } from './features/users/infrastructure/service/user.service';
import { userFeatureKey, userReducer } from './core/state/users/user.reducer';
import { UserEffects } from './core/state/users/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withEnabledBlockingInitialNavigation(),  withRouterConfig({ onSameUrlNavigation: 'reload' })),
     provideHttpClient(
      withInterceptors([authInterceptor]), 
    ),
    { provide: AuthRepository, useClass: AuthService },
    { provide: ProductoRepository, useClass: ProductService },
    { provide: UserRepository, useClass: UserService },
    provideStore({
        [authFeatureKey]: authReducer,
        [productsFeatureKey]: productReducer,
        [userFeatureKey]: userReducer
    }),
    provideEffects([ AuthEffects,ProductEffects,UserEffects]), 
  ]
};
