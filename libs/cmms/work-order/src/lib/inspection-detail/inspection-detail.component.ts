import { Component, inject, OnInit } from '@angular/core';
import { CMMSWorkDetail, IS_INSPECTION, Work } from "@ss/cmms/cmms-api";
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DOC_WORK_ORDER } from '@ss/logistics/api-transaction';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '@ss/common/api-common';
import { CMMSInspectionOrderService } from '../services/c-m-m-s-inspection-order.service';
import { InspectionDetailListComponent } from '../inspection-detail-list/inspection-detail-list.component';
import { CMMSInspectionService } from '../services/c-m-m-s-inspection.service';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-inspection-detail',
    templateUrl: './inspection-detail.component.html',
    styleUrls: ['./inspection-detail.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        PaginationComponent,
        MatTableModule,
        CommonUiAutoCompleteModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        CommonUiDatepickerModule,
        MatButtonModule,
        MaterialModule,
        RouterOutlet,
        InspectionDetailListComponent
    ]
})
export class InspectionDetailComponent extends CMMSWorkDetail implements OnInit {
    private CONTROLS = ['actualStart', 'actualDue', 'memo', 'failsInspection'];
    private detailSrv = inject(CMMSInspectionService);

    constructor(
        public override entitySrv: CMMSInspectionOrderService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            DOC_WORK_ORDER,
            'CMMS_INSPECTION',
            IS_INSPECTION);
    }

    override loadEntity(id: number): Observable<Work> {
        this.detailSrv.setParentId(id);
        return super.loadEntity(id);
    }

    override setupForm(e: Work): UntypedFormGroup {
        const form = super.setupForm(e);
        this.saveButton.visible = !e.id;
        form.disable();
        this.CONTROLS.forEach(c => form.controls[c].enable());
        return form;
    }
}
