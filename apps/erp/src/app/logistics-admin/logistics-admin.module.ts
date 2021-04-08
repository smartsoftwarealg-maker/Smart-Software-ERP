import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './routes';
import {CommonUiLookupModule} from '@ss/common/ui-lookup';
import {PayMethodService} from "../../../../../libs/logistics/api-logistics-common/src";

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
