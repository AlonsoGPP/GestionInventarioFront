import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { SortDir } from "../../model/table.model";
import { Product, ProductoCreateRequest, ProductoUpdateRequest } from "../../../features/products/domain/models/product.model";
import { Category } from "../../model/category.model";

export const initProduct = createAction('[Producto] Init');
export const refreshProduct = createAction('[Producto] Refresh');

export const changeProductPage = createAction(
    '[Producto] Change Page',
    props<{ page: number }>()
);

export const changeProductPageSize = createAction(
    '[Producto] Change Page Size',
    props<{ pageSize: number }>()
);

export const changeProductSort = createAction(
    '[Producto] Change Sort',
    props<{ sort?: string; dir?: SortDir }>()
);

export const changeProductSearch = createAction(
    '[Producto] Change Search',
    props<{ nombre: string; categoriaId: string }>()
);

export const loadProductsRequested = createAction('[Producto] Load Requested');

export const loadProductsSucceeded = createAction(
    '[Producto] Load Succeeded',
    props<{ data: Product[]; total: number }>()
);

export const loadProductsFailed = createAction(
    '[Producto] Load Failed',
    props<{ error: string }>()
);

export const createProduct = createAction(
    '[Producto] Create',
    props<{ request: ProductoCreateRequest }>()
);

export const createProductSuccess = createAction(
    '[Producto] Create Success',
    props<{ message: string }>()
);

export const createProductFailure = createAction(
    '[Producto] Create Failure',
    props<{ message?: string; messages?: string[] }>()
);

export const updateProduct = createAction(
    '[Producto] Update',
    props<{ request: ProductoUpdateRequest }>()
);

export const updateProductSuccess = createAction(
    '[Producto] Update Success',
    props<{ message: string }>()
);

export const updateProductFailure = createAction(
    '[Producto] Update Failure',
    props<{ message: string; messages?: string[] }>()
);

export const getOneProduct = createAction(
    '[Producto] Get One',
    props<{ id: string }>()
);

export const getOneProductSuccess = createAction(
    '[Producto] Get One Success',
    props<{ entity: Product }>()
);

export const deleteProduct = createAction(
    '[Producto] Delete',
    props<{ id: string }>()
);

export const deleteProductSuccess = createAction(
    '[Producto] Delete Success',
    props<{ message: string }>()
);

export const deleteProductFailure = createAction(
    '[Producto] Delete Failure',
    props<{ message: string; messages?: string[] }>()
);

export const getCategorias = createAction('[Producto] Get Categorias');

export const getCategoriasSuccess = createAction(
    '[Producto] Get Categorias Success',
    props<{ categorias: Category[] }>()
);

export const clearProductForm = createAction('[Producto] Clear Form');