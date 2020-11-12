import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Company, CompanyService} from "@ss/administration/api-company";

@Component({
    selector: 'ss-company-list',
    styleUrls: ['./company-list.component.scss'],
    templateUrl: './company-list.component.html'
})
export class CompanyListComponent extends BaseEntityListComponent<Company> {


    displayedColumns = [
        'description',
        'company2',
        'address'
    ];


    constructor(
        public companySrv: CompanyService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService) {
        super(companySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'ADMINISTRATION_COMPANY');
    }


}
