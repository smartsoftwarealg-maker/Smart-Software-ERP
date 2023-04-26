import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {empRoutes} from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(empRoutes)
    ]
})
export class EmpSpaceModule {
}
