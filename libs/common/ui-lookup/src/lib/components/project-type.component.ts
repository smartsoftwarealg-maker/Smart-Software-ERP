import {Component} from '@angular/core';
import { Lookup, ProjectTypeService } from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';


@Component({
    selector: 'ss-project-type-list',
    templateUrl: '../base-templates/list-template.html',
    styleUrls: ['../base-templates/list-template.scss']
})
export class ProjectTypeListComponent extends BaseEntityListComponent<Lookup> {

    displayedColumns = ['description'];

    constructor(
        public companyTypeSrv: ProjectTypeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(companyTypeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_COMPANY_TYPES');
    }

}


@Component({
    selector: 'ss-project-type-detail',
    templateUrl: '../base-templates/detail-template.html',
    styleUrls: ['../base-templates/detail-template.scss']
})
export class ProjectTypeDetailComponent extends BaseEntityDetailComponent<Lookup> {

    constructor(
        public companyTypeServ: ProjectTypeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(companyTypeServ, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_PROJECT_TYPES');
    }

    public override setupForm(e: Lookup): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description:   [e.description,  Validators.required],
            descriptionAr: [e.descriptionAr]
        });
    }
}
