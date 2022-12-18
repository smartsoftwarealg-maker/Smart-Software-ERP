import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Center, CenterService} from '@ss/administration/api-center';
import {Observable, of} from 'rxjs';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {LoginService, PaginatorPersistenceService} from '@ss/common/api-common';

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
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        private loginSrv: LoginService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(centerSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'ADMINISTRATION_CENTER');
    }


    override preload(): Observable<any> {
        this.centerSrv.setParentId(this.loginSrv.appCtx.company);
        return of(true);
    }
}
