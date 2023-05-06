import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ltmRoutes } from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(ltmRoutes)
    ]
})
export class LTMModule { }
