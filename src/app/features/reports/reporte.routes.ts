import { Routes } from "@angular/router";
import { ReportesListComponent } from "./presentation/reportes-list/reportes-list.component";

const reporteRoutes: Routes = [
  {
    path: 'listar',
    component: ReportesListComponent,
  },

  
]
export default reporteRoutes;