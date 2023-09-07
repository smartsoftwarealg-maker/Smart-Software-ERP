import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CMMSFaultListComponent } from './cmms-fault/cmms-fault-list.component';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';
import { CmmsFaultCauseDetailComponent } from './cmms-fault-cause/cmms-fault-cause-detail.component';
import { CMMSFaultCauseListComponent } from './cmms-fault-cause/cmms-fault-cause-list.component';
import { CMMSPriorityListComponent } from './cmms-priority/cmms-priority-list.component';
import { CMMSRootCauseDetailComponent } from './cmms-root-cause/cmms-root-cause-detail.component';
import { CMMSRootCauseListComponent } from './cmms-root-cause/cmms-root-cause-list.component';
import { CMMSFaultDetailComponent } from './cmms-fault/cmms-fault-detail.component';
import { CMMSPriorityDetailComponent } from './cmms-priority/cmms-priority-detail.component';
import { CMMSStatusListComponent } from './cmms-status/cmms-status-list.component';
import { CMMSStatusDetailComponent } from './cmms-status/cmms-status-detail.component';
import { CMMSTypeListComponent } from './cmms-type/cmms-type-list.component';
import { CMMSTypeDetailComponent } from './cmms-type/c-m-m-s-type-detail.component';
import { CMMSRoutingLineListComponent } from '@ss/cmms/cmms-routing';
import { CMMSRoutingLineDetailComponent } from '@ss/cmms/cmms-routing';
import { RouterOutlet } from '@angular/router';
import { CMMSMeterListComponent } from './cmms-meter/cmms-meter-list.component';
import { CMMSMeterDetailComponent } from './cmms-meter/cmms-type-detail.component';
import { CMMSSolutionListComponent } from './cmms-solution/cmms-solution-list.component';
import { CMMSSolutionDetailComponent } from './cmms-solution/c-m-m-s-solution-detail.component';
import { CMMSRoutingPartsDetailComponent } from './cmms-routing-parts-detail/cmms-routing-parts-detail.component';
import { CMMSRoutingPartsListComponent } from './cmms-routing-parts-list/cmms-routing-parts-list.component';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';

@NgModule({
    imports: [
        CommonModule,
        CommonUiLangModule,
        MatSortModule,
        MatTableModule,
        UiPaginationModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterOutlet,
        CommonUiAutoCompleteModule
    ],
    declarations: [
        CMMSFaultDetailComponent,
        CMMSFaultListComponent,
        CmmsFaultCauseDetailComponent,
        CMMSFaultCauseListComponent,
        CMMSPriorityListComponent,
        CMMSRootCauseDetailComponent,
        CMMSRootCauseListComponent,
        CMMSPriorityDetailComponent,
        CMMSStatusListComponent,
        CMMSStatusDetailComponent,
        CMMSTypeListComponent,
        CMMSTypeDetailComponent,
        CMMSRoutingLineListComponent,
        CMMSRoutingLineDetailComponent,
        CMMSMeterListComponent,
        CMMSMeterDetailComponent,
        CMMSSolutionListComponent,
        CMMSSolutionDetailComponent,
        CMMSRoutingPartsListComponent,
        CMMSRoutingPartsDetailComponent,
    ],
})
export class CmmsLookupsModule {}
