import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierTrucksListComponent } from './supplier-trucks-list/supplier-trucks-list.component';
import { SupplierTrucksDetailComponent } from './supplier-trucks-detail/supplier-trucks-detail.component';
import {MaterialModule} from '@ss/common/api-common';


import {ReactiveFormsModule} from '@angular/forms';

import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        SupplierTrucksListComponent, SupplierTrucksDetailComponent,
    ],
})
export class ScheduledSalesSupplierTrucksModule {}
