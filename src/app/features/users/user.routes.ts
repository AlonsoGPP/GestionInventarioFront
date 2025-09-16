import { Routes } from "@angular/router";
import { UsersListComponent } from "./presentation/users-list/users-list.component";

const userRoutes: Routes = [
  {
    path: 'listar',
    component: UsersListComponent,
  },

  
]
export default userRoutes;