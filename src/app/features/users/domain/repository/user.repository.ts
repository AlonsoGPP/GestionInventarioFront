import { Observable } from "rxjs";
import { PagedResult } from "../../../../core/interfaces/PaginationResult";
import { UserPaginationRequest, UserResponse } from "../models/user.model";
import { ResponseBase } from "../../../../core/interfaces";

export abstract class UserRepository {
  abstract getPagination({ page, size}: UserPaginationRequest): Observable<ResponseBase<PagedResult<UserResponse>>>;
}