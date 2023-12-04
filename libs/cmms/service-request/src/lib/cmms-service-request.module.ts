import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceRequestListComponent } from './service-request-list/service-request-list.component';
import { ServiceRequestDetailComponent } from './service-request-detail/service-request-detail.component';
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { ReactiveFormsModule } from "@angular/forms";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { RouterOutlet } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    imports: [CommonModule, CommonUiLangModule, MatSortModule, MatTableModule, UiPaginationModule, CommonUiAutoCompleteModule, CommonUiDatepickerModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTabsModule, ReactiveFormsModule, MatOptionModule, MatSelectModule, MatExpansionModule, RouterOutlet, MatButtonModule],
    declarations: [ServiceRequestListComponent, ServiceRequestDetailComponent],
})
export class CmmsServiceRequestModule {}
