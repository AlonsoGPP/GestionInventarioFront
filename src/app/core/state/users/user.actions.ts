import { createAction, props } from "@ngrx/store";
import { SortDir } from "../../model/table.model";
import { UserResponse } from "../../../features/users/domain/models/user.model";

export const initUser = createAction('[Usuario] Init');
export const refreshUser = createAction('[Usuario] Refresh');

export const changeUserPage = createAction(
    '[Usuario] Change Page',
    props<{ page: number }>()
);

export const changeUserPageSize = createAction(
    '[Usuario] Change Page Size',
    props<{ pageSize: number }>()
);

export const changeUserSort = createAction(
    '[Usuario] Change Sort',
    props<{ sort?: string; dir?: SortDir }>()
);

export const changeUserSearch = createAction(
    '[Usuario] Change Search',
    props<{ nombre: string; categoriaId: string }>()
);

export const loadUsersRequested = createAction('[Usuario] Load Requested');

export const loadUsersSucceeded = createAction(
    '[Usuario] Load Succeeded',
    props<{ data: UserResponse[]; total: number }>()
);

export const loadUsersFailed = createAction(
    '[Usuario] Load Failed',
    props<{ error: string }>()
);
