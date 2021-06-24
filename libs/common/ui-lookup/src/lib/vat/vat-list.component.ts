import { Component } from '@angular/core';
import { Vat, VatService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';


@Component({
    selector: 'ss-vat-list',
    templateUrl: './vat-list.component.html',
    styleUrls: ['./vat-list.component.scss']
})
export class VatListComponent extends BaseEntityListComponent<Vat> {

    displayedColumns = ['value'];

    constructor(
        public vatSrv: VatService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router) {
        super(vatSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'COMMON_VATS');
    }

}
