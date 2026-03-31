import { Component, OnInit } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { MaterialModule } from "@ss/common/api-common";
import { TranslateDirective } from '@ss/common/ui-lang';
import { ERAReport} from '@ss/accounting/accounting-api';
import {AccEraReportService} from "../../../../accounting-api/src/lib/acc-era-report.service";

@Component({
    selector: 'ss-era-report-detail',
    templateUrl: './acc-era-report-detail.component.html',
    styleUrls: ['./acc-era-report-detail.component.scss'],
    standalone: true,
    imports: [
        RouterModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule
    ],
})
export class EraReportDetailComponent extends BaseEntityDetailComponent<ERAReport> implements OnInit {

    constructor(
        public override entitySrv: AccEraReportService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'ACC_ERA_REPORT'
        );
    }

    public override setupForm(e: ERAReport): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
            accountList: [e.accountList]
        });
    }

    override ngOnInit() {
        super.ngOnInit();
    }
}
