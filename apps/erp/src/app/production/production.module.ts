import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { prodRoutes } from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(prodRoutes)
    ]
})
export class ProductionModule {}
