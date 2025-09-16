import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../products/domain/models/product.model';
import { ResponseBase } from '../../../../core/interfaces';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReporteService {
    private readonly API_URL = environment.API_URL + '/Product';

    constructor(private http: HttpClient,) { }

    getLowStockProducts(): Observable<ResponseBase<Product[]>> {
        return this.http.get<any>(this.API_URL + '/GetLowStockProducts');
    }
    getLowStockProductsReport(): Observable<ResponseBase<string>> {
        return this.http.get<any>(this.API_URL + '/GetLowStockProductsReport');
    }


}