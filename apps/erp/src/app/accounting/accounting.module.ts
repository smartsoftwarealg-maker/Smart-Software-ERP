import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {accRoutes} from './routes';

//export const mainRoutes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forChild(accRoutes)
    ]
})
export class AccountingModule {}
