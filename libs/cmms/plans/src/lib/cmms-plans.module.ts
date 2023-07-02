import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CMMSPlanListComponent } from './cmms-plan-list/cmms-plan-list.component';
import { CMMSPlanDetailComponent } from './cmms-plan-detail/cmms-plan-detail.component';
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { MatTableModule } from "@angular/material/table";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
    imports: [CommonModule, CommonUiLangModule, MatTableModule, UiPaginationModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatOptionModule, MatSelectModule],
    declarations: [
        CMMSPlanListComponent,
        CMMSPlanListComponent,
        CMMSPlanDetailComponent,
    ],
})
export class CmmsPlansModule {}
