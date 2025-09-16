import { inject, Injectable } from "@angular/core";
import { UserRepository } from "../domain/repository/user.repository";
import { UserPaginationRequest, UserResponse } from "../domain/models/user.model";
import { Observable } from "rxjs";
import { ResponseBase } from "../../../core/interfaces";
import { PagedResult } from "../../../core/interfaces/PaginationResult";

@Injectable({ providedIn: 'root' })
export class UserFacade implements UserRepository {
    private restauranteRepo = inject(UserRepository);

    getPagination({ page, size }: UserPaginationRequest): Observable<ResponseBase<PagedResult<UserResponse>>> {
        return this.restauranteRepo.getPagination({ page, size });
    }
}