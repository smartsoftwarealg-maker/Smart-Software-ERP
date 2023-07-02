import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { cmmsRoutes } from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(cmmsRoutes)
    ]
})
export class CmmsModule { }
