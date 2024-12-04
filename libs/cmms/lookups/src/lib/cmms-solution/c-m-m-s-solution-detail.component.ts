import { Component } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ReactiveFormsModule, UntypedFormBuilder } from "@angular/forms";
import { BaseLookupDetailClass } from '../detail-template/base-lookup-detail.class';
import { CMMSSolutionService } from '../services/cmms.solution.service';
import { CommonModule } from "@angular/common";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MaterialModule } from "@ss/common/api-common";
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';


@Component({
    selector: 'ss-cmms-solution-detail',
    templateUrl: '../detail-template/cmms-fault-detail.component.html',
    styleUrls: ['../detail-template/cmms-fault-detail.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MatSortModule,
        MatTableModule,

        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterOutlet,
        UiAutoCompleteComponent
    ],
})
export class CMMSSolutionDetailComponent extends BaseLookupDetailClass {
    constructor(
        public override entitySrv: CMMSSolutionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_SOLUTION');
    }
}
