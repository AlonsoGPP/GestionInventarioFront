import { Routes } from '@angular/router';
import LoginComponent from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path:'**', redirectTo:'login'}
];

export default routes;