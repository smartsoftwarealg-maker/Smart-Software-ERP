import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { gicaRoutes } from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(gicaRoutes)
    ]
})
export class GicaModule { }
