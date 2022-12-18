import { Routes } from '@angular/router';
import {MainPageComponent} from '@ss/sales/ecommerce';

export const ecommerceRoutes: Routes = [
    {path: '', component: MainPageComponent, pathMatch: 'full'},
    {path: '**', redirectTo: '/app/main-page', pathMatch: 'full'}
];

