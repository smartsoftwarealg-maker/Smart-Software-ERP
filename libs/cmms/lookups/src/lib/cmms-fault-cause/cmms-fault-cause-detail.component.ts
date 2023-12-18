import { Component } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ReactiveFormsModule, UntypedFormBuilder } from "@angular/forms";
import { BaseLookupDetailClass } from '../detail-template/base-lookup-detail.class';
import { CMMSFaultCauseService } from '../services/cmms.fault.cause.service';
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MaterialModule } from "@ss/common/api-common";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";

@Component({
    selector: 'ss-cmms-fault-cause-detail',
    templateUrl: '../detail-template/cmms-fault-detail.component.html',
    styleUrls: ['../detail-template/cmms-fault-detail.component.css'],
    standalone: true,
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
})
export class CmmsFaultCauseDetailComponent extends BaseLookupDetailClass {
    constructor(
        public override entitySrv: CMMSFaultCauseService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'CMMS_FAULT_CAUSE');
    }
}
