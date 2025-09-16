import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Category } from '../../../../core/model/category.model';
import { ProductoCreateRequest, ProductoUpdateRequest } from '../../domain/models/product.model';
import { filter, take } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ProductSelector from '../../../../core/state/products/products.selectors';
import * as ProductActions from '../../../../core/state/products/products.actions';
import { StorageService } from '../../../../shared/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(Store);
  storageService = inject(StorageService);
  isSaving$ = this.store.select(ProductSelector.selectIsSaving);
  isLoadingForm$ = this.store.select(ProductSelector.selectIsLoadingForm);
  formEntity$ = this.store.select(ProductSelector.selectForm);
  categorias$ = this.store.select(ProductSelector.selectCategorias);
  isEdit = false;
  private id: string | null = null;
  saving = false;

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(80)]],
    descripcion: ['', [Validators.required, Validators.maxLength(200)]],
    precio: [0, [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d+(\.\d{1,2})?$/) 
    ]],
    cantidad: [null, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
    categoriaId: ['', [Validators.required]],
    activo: [false],
  });

  ngOnInit(): void {
    this.store.dispatch(ProductActions.getCategorias());
debugger
    this.id = this.storageService.getItem('idProducto');
    this.isEdit = !!this.id;


    if (this.isEdit && this.id) {
      this.store.dispatch(ProductActions.getOneProduct({ id: this.id }));

      this.formEntity$
        .pipe(filter(Boolean), take(1))
        .subscribe((r: any) => {
          this.form.patchValue({
            nombre: r.name,
            descripcion: r.description,
            precio: parseFloat(r.price),
            activo: r.activo,
            cantidad: r.quantity,
            categoriaId: r.categoryId
          });
        });
    } else {
      this.store.dispatch(ProductActions.clearProductForm());
    }
  }


  cancelar() { this.router.navigate(['/productos']); }

  guardar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const v = this.form.value;

    if (this.isEdit && this.id) {
      const request: ProductoUpdateRequest = {
        id: this.id,
        name: v.nombre!,
        description: v.descripcion!,
        quantity: v.cantidad!,
        price: v.precio!,
        categoryId: v.categoriaId!,

      }
      this.store.dispatch(ProductActions.updateProduct({ request }));
    } else {
      const request: ProductoCreateRequest = {
        name: v.nombre!,
        description: v.descripcion!,
        quantity: v.cantidad!,
        price: v.precio!,
        categoryId: v.categoriaId!,

      }
      this.store.dispatch(ProductActions.createProduct({ request }));
    }


  }





  trackByCatId = (_: number, c: Category) => c.id;
 }
