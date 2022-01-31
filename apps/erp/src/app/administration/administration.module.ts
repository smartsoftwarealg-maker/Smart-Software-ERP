import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './routes';
import {CommonUiOrganizationsModule} from '@ss/common/ui-organizations';

@NgModule({
    imports: [
        CommonUiOrganizationsModule,
        RouterModule.forChild(mainRoutes)
    ]
})
export class AdministrationModule {}
