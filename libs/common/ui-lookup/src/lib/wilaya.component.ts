import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {Wilaya, WilayaService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {PaginatorPersistenceService} from '@ss/common/api-common';


@Component({
    selector: 'ss-wilaya-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class WilayaListComponent extends BaseEntityListComponent<Wilaya> {

    displayedColumns = ['description'];

    constructor(
        public wilayaSrv: WilayaService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(wilayaSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'COMMON_WILAYAS');
    }

}



@Component({
    selector: 'ss-wilaya-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class WilayaDetailComponent extends BaseEntityDetailComponent<Wilaya> {

    constructor(
        public wilayaSrv: WilayaService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: UntypedFormBuilder) {
        super(wilayaSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_WILAYA');
    }

    public setupForm(e: Wilaya): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
