import { inject, Injectable } from "@angular/core";
import { ProductoRepository } from "../domain/repository/produt.repository";
import { Observable } from "rxjs";
import { PagedResult } from "../../../core/interfaces/PaginationResult";
import { Product, ProductoCreateRequest, ProductoUpdateRequest, ProductPaginationRequest } from "../domain/models/product.model";
import { ResponseBase } from "../../../core/interfaces";

@Injectable({ providedIn: 'root' })
export class ProductoFacade implements ProductoRepository {
    private restauranteRepo = inject(ProductoRepository);

    getPagination({ page, size, name, category }: ProductPaginationRequest): Observable<PagedResult<Product>> {
        return this.restauranteRepo.getPagination({page, size, name, category});
    }

    create(request: ProductoCreateRequest): Observable<ResponseBase<string>> {
         return this.restauranteRepo.create(request);
    }

    update(request: ProductoUpdateRequest): Observable<ResponseBase<string>> {
         return this.restauranteRepo.update(request);
    }


    getById(id: string){
        return this.restauranteRepo.getById(id)
    }

    delete(id: string){
        return this.restauranteRepo.delete(id)
    }
}
