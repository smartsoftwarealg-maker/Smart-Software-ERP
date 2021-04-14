import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './routes';
import {CommonUiLookupModule} from '@ss/common/ui-lookup';
import {PayMethodService} from '@ss/logistics/api-logistics-common';

@NgModule({
    imports: [
        CommonUiLookupModule,
        RouterModule.forChild(mainRoutes)
    ]
})
export class LogisticsAdminModule {
    constructor(private payMethod: PayMethodService) {
        this.payMethod.load();
    }
}
