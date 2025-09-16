import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ToastService } from "../../../shared/services/toast.service";
import { Router } from "@angular/router";
import * as ProductActions from './products.actions';
import * as Sel from './products.selectors';

import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { ProductoFacade } from "../../../features/products/application/product.facade";
import { CategoriaService } from "../../../shared/services";
@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private productoFacade = inject(ProductoFacade);
  private categoriaService = inject(CategoriaService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  
  queryChanges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProductActions.initProduct,
        ProductActions.refreshProduct,
        ProductActions.changeProductPage,
        ProductActions.changeProductPageSize,
        ProductActions.changeProductSort 
      ),
      map(() => ProductActions.loadProductsRequested())
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.changeProductSearch),
      debounceTime(300),
      distinctUntilChanged((a, b) => a.nombre === b.nombre && a.categoriaId === b.categoriaId),
      map(() => ProductActions.loadProductsRequested())
    )
  );


  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductsRequested),
      withLatestFrom(this.store.select(Sel.selectQueryForApi)),
      switchMap(([_, q]) =>
        this.productoFacade.getPagination(q).pipe(
          map(r => ProductActions.loadProductsSucceeded({ data: r.items, total: r.totalItems })),
          catchError((e) => of(ProductActions.loadProductsFailed({ error: e?.message ?? 'Error' })))
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProduct),

      switchMap(({ request }) =>
        this.productoFacade.create(request).pipe(
          map(r => ProductActions.createProductSuccess({ message: r.message })),
          catchError(({ error }) => {
            return of(ProductActions.createProductFailure({ message: error.message }))
          })
        ))
    ));

  createSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.createProductSuccess),
        tap(({ message }) => this.toastService.success(message)),
        tap(() => this.router.navigateByUrl('/products/listar'))
      ),
    { dispatch: false }
  );

  createFailute$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.createProductFailure),
        tap(({ message }) => this.toastService.error(message ?? '')),
        tap(({ messages }) => {
          if (messages != null) {
            messages.forEach((message) => {
              this.toastService.error(message ?? '');
            })
          }
        })
      ),
    { dispatch: false }
  );

  getOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getOneProduct),

      switchMap(({ id }) =>
        this.productoFacade.getById(id).pipe(
          map((product) => ProductActions.getOneProductSuccess({ entity: product })),
        ))
    ));

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),

      switchMap(({ request }) =>
        this.productoFacade.update(request).pipe(
          map(r => ProductActions.createProductSuccess({ message: r.message })),
          catchError(({ error }) => {
            return of(ProductActions.createProductFailure({ message: error.message }))
          })
        ))
    ));

  updateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.updateProductSuccess),
        tap(({ message }) => this.toastService.success(message)),
        tap(() => this.router.navigateByUrl('/productos'))
      ),
    { dispatch: false }
  );

  updateRestauranteFailute$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.updateProductFailure),
        tap(({ message }) => this.toastService.error(message ?? '')),
        tap(({ messages }) => {
          if (messages != null) {
            messages.forEach((message) => {
              this.toastService.error(message ?? '');
            })
          }
        })
      ),
    { dispatch: false }
  );

  getCategorias$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getCategorias),

      switchMap(() =>
        this.categoriaService.getCategorias().pipe(
          map((categorias) => ProductActions.getCategoriasSuccess({ categorias  })),
        ))
    ));


    delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),

      switchMap(({ id }) =>
        this.productoFacade.delete(id).pipe(
          map(r => ProductActions.deleteProductSuccess({ message: r.message })),
          catchError(({ error }) => {
            return of(ProductActions.deleteProductFailure({ message: error.message, messages: error.messages  }))
          })
        ))
    ));

  deleteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.deleteProductSuccess),
        tap(({ message }) => this.toastService.success(message)),
        tap(() => this.router.navigateByUrl('/productos')),
        map(()=> ProductActions.loadProductsRequested()),
      ),
  );

  deleteFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.updateProductFailure),
        tap(({ message }) => this.toastService.error(message ?? '')),
        tap(({ messages }) => {
          if (messages != null) {
            messages.forEach((message) => {
              this.toastService.error(message ?? '');
            })
          }
        })
      ),
    { dispatch: false }
  );

}
