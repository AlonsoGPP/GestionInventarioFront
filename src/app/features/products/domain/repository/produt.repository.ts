import { Observable } from "rxjs";
import { Product, ProductoCreateRequest, ProductoUpdateRequest, ProductPaginationRequest } from "../models/product.model";
import { ResponseBase } from "../../../../core/interfaces";
import { PagedResult } from "../../../../core/interfaces/PaginationResult";

export abstract class ProductoRepository {
  abstract getPagination({ page, size, name, category }: ProductPaginationRequest): Observable<PagedResult<Product>>;

  abstract create(request: ProductoCreateRequest): Observable<ResponseBase<any>>;
  
  abstract update(request: ProductoUpdateRequest): Observable<ResponseBase<string>>;

  abstract getById(id: string): Observable<Product>;

  abstract delete(id: string): Observable<ResponseBase<string>>;


}