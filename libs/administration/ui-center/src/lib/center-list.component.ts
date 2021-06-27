import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Center, CenterService} from '@ss/administration/api-center';
import {Observable, of} from 'rxjs';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {LoginService} from '@ss/common/api-common';

@Component({
    selector: 'ss-center-list',
    styleUrls: ['./center-list.component.scss'],
    templateUrl: './center-list.component.html'
})
export class CenterListComponent extends BaseEntityListComponent<Center> {


    displayedColumns = [
        'description',
        'address'
    ];


    constructor(
        public centerSrv: CenterService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        private loginSrv: LoginService) {
        super(centerSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'ADMINISTRATION_CENTER');
    }


    preload(): Observable<any> {
        this.centerSrv.setParentId(this.loginSrv.appCtx.company);
        return of(true);
    }
}
