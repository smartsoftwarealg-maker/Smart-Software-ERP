import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { foodRoutes } from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(foodRoutes)
    ]
})
export class FoodCartModule { }
