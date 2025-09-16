import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { UserFacade } from "../../../features/users/application/user.facade";
import { ToastService } from "../../../shared/services";
import { Router } from "@angular/router";
import { changeUserPage, changeUserPageSize, changeUserSort, initUser, refreshUser, loadUsersSucceeded } from './user.actions';
import * as UserActions from './user.actions';
import * as Sel from './user.selector';;
@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private userFacade = inject(UserFacade);


  
  queryChanges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        initUser,
        refreshUser,
        changeUserPage,
        changeUserPageSize,
        changeUserSort 
      ),
      map(() => UserActions.loadUsersRequested())
    ),
    
  );
    load$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.loadUsersRequested),
        withLatestFrom(this.store.select(Sel.selectQueryForApi)),
        switchMap(([_, q]) =>
          this.userFacade.getPagination(q).pipe(
            map(r => UserActions.loadUsersSucceeded({ data: r.payload.items, total: r.payload.totalItems })),
            catchError((e) => of(UserActions.loadUsersFailed({ error: e?.message ?? 'Error' })))
          )
        )
      )
    );
  
}