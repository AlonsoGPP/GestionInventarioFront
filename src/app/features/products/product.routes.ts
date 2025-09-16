import { Routes } from "@angular/router";
import { ListProductComponent } from "./presentation/list-product/list-product/list-product.component";
import { ProductFormComponent } from "./presentation/product-form/product-form.component";

const productoRoutes: Routes = [
  {
    path: 'listar',
    component: ListProductComponent,
  },
  {
    path: 'register',
    component: ProductFormComponent,
  },
  {
    path: 'edit',
    component: ProductFormComponent,
  }
]
export default productoRoutes;