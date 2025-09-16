import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, on } from '@ngrx/store';
import { selectAuthUser } from '../../../../../core/state';
import { combineLatest } from 'rxjs';
import * as ProductSelector from '../../../../../core/state/products/products.selectors';
import * as ProductActions from '../../../../../core/state/products/products.actions';
import { StorageService } from '../../../../../shared/services';
import { Category } from '../../../../../core/model/category.model';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { AlertComponent } from '../../../../../shared/components/alert/alert.component';
@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule, TableComponent, AlertComponent, ReactiveFormsModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListProductComponent implements OnInit{
  private store = inject(Store);
  storeKey='idProducto';
  private router = inject(Router);
  private fb = inject(FormBuilder);
  storageService = inject(StorageService);
  showAlerta = false;
  mensaje = '';
  idEliminar = '';

  user$ = this.store.select(selectAuthUser);
  

  formBusqueda = this.fb.group({
    nombreProducto: [''],
    categoriaId: ['']
  })


  vm$ = combineLatest({
    rows: this.store.select(ProductSelector.selectRows),
    total: this.store.select(ProductSelector.selectTotal),
    loading: this.store.select(ProductSelector.selectLoading),
    page: this.store.select(ProductSelector.selectPage),
    pageSize: this.store.select(ProductSelector.selectPageSize),
    headers: this.store.select(ProductSelector.selectHeaders),
  });

  categorias$= this.store.select(ProductSelector.selectCategorias);


  ngOnInit() {
    this.store.dispatch(ProductActions.initProduct());
    this.store.dispatch(ProductActions.getCategorias());
  }

  // onSearch(search: string) { this.store.dispatch(ProductActions.changeSearch({ search })); }
  onSort(sort: string, dir: 'asc' | 'desc') { this.store.dispatch(ProductActions.changeProductSort({ sort, dir })); }
  onPage(page: number) { this.store.dispatch(ProductActions.changeProductPage({ page })); }
  onPageSize(pageSize: number) { this.store.dispatch(ProductActions.changeProductPageSize({ pageSize })); }


  agregarProducto() {
    this.storageService.removeItem('idProducto');
    this.router.navigate(['/products/register'])
  }

  editar(id: string) {
    this.storageService.setItem('idProducto', id);
    this.router.navigate(['/products/edit',]);
    this.store.dispatch(ProductActions.clearProductForm());

  }

  showEliminar(id:string, nombre:string){
    this.showAlerta = true;
    this.mensaje = "Esta seguro que desea eliminar al producto : " + nombre + " ?";
    this.idEliminar = id;
  }


  eliminar(){
    this.store.dispatch(ProductActions.deleteProduct({id: this.idEliminar}));
    this.showAlerta = false;
  }

  closeAlerta(){
    this.showAlerta = false;
  }

  filtrar(){
    debugger
    const nombreProducto = this.formBusqueda.value.nombreProducto ?? '';
    const categoriaProducto = this.formBusqueda.value.categoriaId ?? ''
    this.store.dispatch(ProductActions.changeProductSearch({ nombre:nombreProducto , categoriaId :categoriaProducto }));
  }

  trackByCatId = (_: number, c: Category) => c.id;
  
 }
