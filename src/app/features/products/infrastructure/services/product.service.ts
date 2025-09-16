import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ResponseBase } from '../../../../core/interfaces';
import { PagedResult } from '../../../../core/interfaces/PaginationResult';
import { Product, ProductoCreateRequest, ProductoUpdateRequest, ProductPaginationRequest } from '../../domain/models/product.model';
import { ProductoRepository } from '../../domain/repository/produt.repository';



@Injectable({
    providedIn: 'root'
})
export class ProductService implements ProductoRepository {

    constructor(private http: HttpClient) {}

    private readonly API_URL = environment.API_URL + '/Product';


getPagination(request: ProductPaginationRequest): Observable<PagedResult<Product>> {
  const req: any = { ...request };

  if (!req.category) {
    delete req.category; 
  }

  return this.http.post<ResponseBase<PagedResult<Product>>>(this.API_URL + '/ListPaged', req)
    .pipe(map(resp => resp.payload));
}

    create(request: ProductoCreateRequest): Observable<ResponseBase<string>> {
        return this.http.post<ResponseBase<string>>(this.API_URL + '/Create', request);
    }

    update(request: ProductoUpdateRequest): Observable<ResponseBase<string>> {
        return this.http.put<ResponseBase<string>>(this.API_URL + '/Update', request);
    }


    getById(id: string): Observable<Product> {
        return this.http.get<ResponseBase<Product>>(this.API_URL + `/GetById/${id}`).pipe(
            map(resp => resp.payload)
        );
    }

     delete(id: string): Observable<ResponseBase<string>> {
        return this.http.delete<ResponseBase<string>>(this.API_URL + `/Delete/${id}`).pipe(
        );
    }
}