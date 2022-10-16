import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonUiLookupModule} from '@ss/common/ui-lookup';
import {hrLookupRoutes} from './routes';

@NgModule({
    imports: [
        CommonUiLookupModule,
        RouterModule.forChild(hrLookupRoutes)
    ]
})
export class HrLookupsModule {}
