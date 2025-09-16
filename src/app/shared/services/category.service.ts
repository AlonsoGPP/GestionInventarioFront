import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { map, Observable } from "rxjs";
import { Category } from "../../core/model/category.model";
import { ResponseBase } from "../../core/interfaces";

@Injectable({ providedIn: 'root' })
export class CategoriaService  {
 
  
constructor(private readonly http: HttpClient) {}

  private readonly API_URL = environment.API_URL + '/Category';

  getCategorias(): Observable<Category[]> {
    return this.http.get<ResponseBase<Category[]>>(`${this.API_URL}/GetAll`).pipe(
        map(resp => resp.payload)
    );
  }



}