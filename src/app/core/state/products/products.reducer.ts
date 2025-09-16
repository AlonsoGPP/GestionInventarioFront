import { createReducer, on } from "@ngrx/store";
import { Product } from "../../../features/products/domain/models/product.model";
import { TableState } from "../../model/table.model";
import { changeProductPage, changeProductPageSize, changeProductSearch, changeProductSort, clearProductForm, createProduct, createProductFailure, createProductSuccess, getCategorias, getCategoriasSuccess, getOneProduct, getOneProductSuccess, loadProductsFailed, loadProductsRequested, loadProductsSucceeded, updateProduct, updateProductFailure, updateProductSuccess } from "./products.actions";
import { from } from "rxjs";

export type ProductsState = TableState<Product>;

const initialState: ProductsState = {
  rows: [],
  total: 0,
  loading: false,
  error: null,
  query: { page: 1, size: 10, nombre: '', categoria: '', },
  headers: [
    { label: 'Nombre', key: 'nombre', sortable: false, align: 'left' },
    { label: 'Descripción', key: 'descripcion', sortable: false, align: 'left' },
    { label: 'Precio', key: 'precio', sortable: false, align: 'right', width: 'w-32' },
    { label: 'Cantidad', key: 'cantidad', sortable: false, align: 'left', width: 'w-32' },
    { label: 'Categoria', key: 'categoria', sortable: false, align: 'left', width: 'w-32' },
    { label: 'Acciones', key: '', sortable: false, align: 'left', width: 'w-32' },
  ],
  isSaving: false,
  form: null,
  isLoadingForm: false,
  categorias: {
    isLoading: true,
    items: []
  }


};
export const productsFeatureKey = 'products';

export const productReducer = createReducer(
  initialState,

  on(changeProductPage, (s, { page }) => ({ ...s, query: { ...s.query, page } })),
  on(changeProductPageSize, (s, { pageSize }) => ({
    ...s,
    query: { ...s.query, pageSize, page: 1 }      // resetea a página 1
  })),
  on(changeProductSort, (s, { sort, dir }) => ({
    ...s,
    query: { ...s.query, sort, dir, page: 1 }
  })),
  on(changeProductSearch, (s, { nombre, categoriaId }) => ({
    ...s,
    query: { ...s.query, nombre, categoria: categoriaId, page: 1 }
  })),

  on(loadProductsRequested, (s) => ({ ...s, loading: true, error: null })),
  on(loadProductsSucceeded, (s, { data, total }) => ({ ...s, rows: data, total, loading: false })),
  on(loadProductsFailed, (s, { error }) => ({ ...s, loading: false, error })),
  on(createProduct, (s,) => ({
    ...s,
    isSaving: true
  })),
  on(createProductSuccess, (s,) => ({
    ...s,
    isSaving: false
  })),
  on(createProductFailure, (s,) => ({
    ...s,
    isSaving: false
  })),
  on(updateProduct, (s,) => ({
    ...s,
    isSaving: true
  })),
  on(updateProductSuccess, (s,) => ({
    ...s,
    isSaving: false
  })),
  on(updateProductFailure, (s,) => ({
    ...s,
    isSaving: false
  })),
  on(getOneProduct, (s,) => ({
    ...s,
    isLoadingForm: true
  })),
  on(getOneProductSuccess, (s, { entity }) => ({
    ...s,
    isLoadingForm: false,
    form: entity
  })),
  on(clearProductForm, (s,) => ({
    ...s,
    isLoadingForm: false,
    form: null
  })),
  on(getCategorias, (s,) => ({
    ...s,
    categorias: {
      isLoading: true,
      items: []
    }
  })),
  on(getCategoriasSuccess, (s, { categorias }) => ({
    ...s,
    categorias: {
      isLoading: false,
      items: categorias
    }
  }))
);
