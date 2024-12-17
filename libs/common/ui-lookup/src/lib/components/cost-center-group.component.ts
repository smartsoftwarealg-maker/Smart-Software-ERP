import {Component} from '@angular/core';
import { CostCenterGroupService, Lookup } from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';

import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-cc-group-list',
    templateUrl: '../base-templates/list-template.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        MaterialModule,
        PaginationComponent,

        PaginationComponent
    ],
    styleUrls: ['../base-templates/list-template.scss']
})
export class CostCenterGroupListComponent extends BaseEntityListComponent<Lookup> {

    displayedColumns = ['description', 'descriptionAr'];

    constructor(
        public markSrv: CostCenterGroupService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(markSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_CC_GROUPS');
    }
}

@Component({
    selector: 'ss-cc-group-detail',
    templateUrl: '../base-templates/detail-template.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        MaterialModule,
        TranslateDirective,
       


    ],
    styleUrls: ['../base-templates/detail-template.scss']
})
export class CostCenterGroupDetailComponent extends BaseEntityDetailComponent<Lookup> {

    constructor(
        public markSrv: CostCenterGroupService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(markSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_CC_GROUPS');
    }

    public override setupForm(e: Lookup): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr]
        });
    }
}

