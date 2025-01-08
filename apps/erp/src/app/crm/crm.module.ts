import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { crmRoutes } from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(crmRoutes)
    ]
})
export class CrmModule { }
