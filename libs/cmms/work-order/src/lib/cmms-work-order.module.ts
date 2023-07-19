import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderDetailComponent } from './work-order-detail/work-order-detail.component';
import { WorkOrderListComponent } from './work-order-list/work-order-list.component';
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { MatTableModule } from "@angular/material/table";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { MatButtonModule } from "@angular/material/button";
import { MaterialModule } from "@ss/common/api-common";

@NgModule({
    imports: [
        CommonModule,
        CommonUiLangModule,
        MatTableModule,
        UiPaginationModule,
        CommonUiAutoCompleteModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        CommonUiDatepickerModule,
        MatButtonModule,
        MaterialModule
    ],
    declarations: [
        WorkOrderDetailComponent,
        WorkOrderListComponent
    ],
})
export class CmmsWorkOrderModule {}
