import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FurnitureReceiverListComponent } from './furniture-receiver-list/furniture-receiver-list.component';
import { FurnitureReceiverDetailComponent } from './furniture-receiver-detail/furniture-receiver-detail.component';
import { FurnitureDetailComponent } from './furniture-detail/furniture-detail.component';
import { FurnitureListComponent } from './furniture-list/furniture-list.component';
import { FurnitureReceptionListComponent } from './furniture-reception-list/furniture-reception-list.component';
import { FurnitureReceptionLineListComponent } from './furniture-reception-line-list/furniture-reception-line-list.component';
import { FurnitureReceptionLineDetailComponent } from './furniture-reception-line-detail/furniture-reception-line-detail.component';
import { MaterialModule } from '@ss/common/api-common';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { RemunerationPaymonthEditorModule } from '@ss/remuneration/paymonth-editor';
import { CommonPayrollModule } from '@ss/payroll-common';
import { FurnitureAssignmentDetailComponent } from './furniture-assignment-detail/furniture-assignment-detail.component';
import { FurnitureAssignmentListComponent } from './furniture-assignment-list/furniture-assignment-list.component';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { FurnitureReceptionDetailComponent } from './furniture-reception-detail/furniture-reception-detail.component';
import { RouterOutlet } from '@angular/router';
import { FurnitureSalesListComponent } from './furniture-sales-list/furniture-sales-list.component';
import { FurnitureSalesDetailComponent } from './furniture-sales-detail/furniture-sales-detail.component';
import { AppArchiveMainComponent } from '@ss/common/app-archive';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        UiPaginationModule,
        CommonUiLangModule,
        CommonUiAutoCompleteModule,
        RemunerationPaymonthEditorModule,
        CommonPayrollModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        AppArchiveMainComponent
    ],
    declarations: [
        FurnitureReceiverListComponent,
        FurnitureReceiverDetailComponent,
        FurnitureDetailComponent,
        FurnitureListComponent,
        FurnitureReceptionListComponent,
        FurnitureReceptionDetailComponent,
        FurnitureReceptionLineListComponent,
        FurnitureReceptionLineDetailComponent,
        FurnitureAssignmentDetailComponent,
        FurnitureAssignmentListComponent,
        FurnitureSalesListComponent,
        FurnitureSalesDetailComponent,
    ],
})
export class FurnitureFurnitureModule {}
