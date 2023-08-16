import {Component} from '@angular/core';
import { Lookup, Mark, MarkService } from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import { InsuranceAgencyService } from '@ss/common/api-lookup';

@Component({
    selector: 'ss-Agency-list',
    templateUrl: '../base-templates/list-template.html',
    styleUrls: ['../base-templates/list-template.scss']
})
export class InsuranceAgencyListComponent extends BaseEntityListComponent<Lookup> {

    displayedColumns = ['description', 'descriptionAr'];

    constructor(
        public markSrv: InsuranceAgencyService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(markSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'PARK_AGENCIES');
    }
}

@Component({
    selector: 'ss-Agency-detail',
    templateUrl: '../base-templates/detail-template.html',
    styleUrls: ['../base-templates/detail-template.scss']
})
export class InsuranceAgencyDetailComponent extends BaseEntityDetailComponent<Lookup> {

    constructor(
        public markSrv: InsuranceAgencyService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(markSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PARK_AGENCIES');
    }

    public override setupForm(e: Mark): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr]
        });
    }
}

