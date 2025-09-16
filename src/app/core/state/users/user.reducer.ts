import { createReducer, on } from "@ngrx/store";
import { UserResponse } from "../../../features/users/domain/models/user.model";
import { TableState } from "../../model/table.model";
import { changeUserPage, changeUserPageSize, changeUserSearch, changeUserSort, loadUsersFailed, loadUsersRequested, loadUsersSucceeded } from "./user.actions";

export type UserState = TableState<UserResponse>;

const initialState: UserState = {
  rows: [],
  total: 0,
  loading: false,
  error: null,
  query: { page: 1, size: 10, nombre: '', categoria: '', },
  headers: [
    { label: 'Username', key: 'nombre', sortable: false, align: 'left' },
    { label: 'Email', key: 'descripcion', sortable: false, align: 'left' },
    { label: 'Rol', key: 'precio', sortable: false, align: 'right', width: 'w-32' },
    { label: 'F. Creacion', key: 'cantidad', sortable: false, align: 'left', width: 'w-32' },
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
export const userFeatureKey = 'user';

export const userReducer = createReducer(
  initialState,

  on(changeUserPage, (s, { page }) => ({ ...s, query: { ...s.query, page } })),
  on(changeUserPageSize, (s, { pageSize }) => ({
    ...s,
    query: { ...s.query, pageSize, page: 1 }  
  })),
  on(changeUserSort, (s, { sort, dir }) => ({
    ...s,
    query: { ...s.query, sort, dir, page: 1 }
  })),
  on(changeUserSearch, (s, { nombre, categoriaId }) => ({
    ...s,
    query: { ...s.query, nombre, categoria: categoriaId, page: 1 }
  })),

  on(loadUsersRequested, (s) => ({ ...s, loading: true, error: null })),
  on(loadUsersSucceeded, (s, { data, total }) => ({ ...s, rows: data, total, loading: false })),
  on(loadUsersFailed, (s, { error }) => ({ ...s, loading: false, error })),
);