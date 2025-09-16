import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ResponseBase } from '../../../../core/interfaces';
import { PagedResult } from '../../../../core/interfaces/PaginationResult';
import { UserPaginationRequest, UserResponse } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repository/user.repository';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService implements UserRepository {
    private apiUrl = environment.API_URL + '/User';

    constructor(private http: HttpClient) {}

   getPagination(request: UserPaginationRequest): Observable<ResponseBase<PagedResult<UserResponse>>> {
        return this.http.post<any>(this.apiUrl + '/ListPaged', request);
    }

}