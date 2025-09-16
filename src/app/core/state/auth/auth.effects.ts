import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../features/auth/application/auth.facade';

@Injectable()
export class AuthEffects {
 private authFacade= inject(AuthFacade);
    private actions$= inject(Actions);
    private router= inject(Router);
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            mergeMap(action =>
                this.authFacade.login(action.username,action.password).pipe(
                    map(({email, id, role, token, username}) => AuthActions.loginSuccess({ token, user: {email, role, username,id} })),
                    catchError(error => of(AuthActions.loginFailure({ error })))
                )
            )
        )
    );

    loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(() => this.router.navigate(['/products/listar']))
            ),
        { dispatch: false }
    );

    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.authLogout),
                tap(() => this.router.navigate(['/login']))
            ),
        { dispatch: false }
    );


}