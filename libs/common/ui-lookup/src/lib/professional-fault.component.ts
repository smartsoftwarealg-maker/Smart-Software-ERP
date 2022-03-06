import { Component } from '@angular/core';
import {Lookup, ProfessionalFaultService} from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityDetailComponent, BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';


@Component({
    selector: 'ss-division-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class ProfessionalFaultListComponent extends BaseEntityListComponent<Lookup> {

    displayedColumns = ['description'];

    constructor(
        public listSrv: ProfessionalFaultService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(listSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv
            , defReportSrv,
            pagPersistSrv,
            'PAYROLL_PUNISHMENTS');
    }
}


@Component({
    selector: 'ss-division-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class ProfessionalFaultDetailComponent extends BaseEntityDetailComponent<Lookup> {

    constructor(
        public divisionSrv: ProfessionalFaultService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(divisionSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'PAYROLL_PUNISHMENTS');
    }

    public setupForm(e: Lookup): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
