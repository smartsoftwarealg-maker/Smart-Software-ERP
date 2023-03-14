import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {furnitureRoutes} from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(furnitureRoutes)
    ]
})
export class FurnitureModule { }
