import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest, filter, map, race, switchMap, take, tap } from "rxjs";
import { Actions, ofType } from "@ngrx/effects";
import * as Auth from '../state/auth/auth.actions';
import { selectAuthLoaded, selectIsAuthenticated } from "../state";
export const authGuard: CanActivateFn = (_route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    take(1), // solo necesitamos un valor
    map(isAuth =>
      isAuth
        ? true
        : router.createUrlTree(['/auth/login'], {
            queryParams: { returnUrl: state.url },
          })
    )
  );
};

