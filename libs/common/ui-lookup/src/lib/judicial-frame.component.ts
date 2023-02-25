import {Component} from '@angular/core';
import {Lookup, Mark, MarkService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {DairaService} from '../../../api-lookup/src/lib/dira.service';
import {JudicialFrameService} from '@ss/payroll/api-employee';

@Component({
    selector: 'ss-mark-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class JudicialFrameListComponent extends BaseEntityListComponent<Lookup> {

    displayedColumns = ['description', 'descriptionAr'];

    constructor(
        public markSrv: JudicialFrameService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(markSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'PAYROLL_JUDICIAL_FRAME');
    }
}

@Component({
    selector: 'ss-mark-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class JudicialFrameDetailComponent extends BaseEntityDetailComponent<Lookup> {

    constructor(
        public markSrv: JudicialFrameService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(markSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_JUDICIAL_FRAME');
    }

    public override setupForm(e: Mark): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr]
        });
    }
}

