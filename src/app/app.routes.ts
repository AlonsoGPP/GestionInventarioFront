import { Routes } from '@angular/router';
import HomeLayoutComponent from './core/frame-layout/home-layout/home-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path: 'auth', loadChildren: () => import('./features/auth/presentation/auth.routes')},
    {
        path:'',
        component:HomeLayoutComponent,
        canActivate: [authGuard],
        children:[
            { path: 'products', loadChildren: () => import('./features/products/product.routes') },
            { path: 'reports', loadChildren: () => import('./features/reports/reporte.routes') },
            { path: 'users', loadChildren: () => import('./features/users/user.routes') },
        ]
    }
];
