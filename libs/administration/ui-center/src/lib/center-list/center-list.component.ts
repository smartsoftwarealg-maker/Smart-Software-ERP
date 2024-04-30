import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {Center, CenterService} from '@ss/administration/api-center';
import {Observable, of} from 'rxjs';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { LoginService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'ss-center-list',
    styleUrls: ['./center-list.component.scss'],
    templateUrl: './center-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
    ],

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
        this.pagination.pageSize = 10;
    }


    override preload(): Observable<any> {
        this.centerSrv.setParentId(this.loginSrv.appCtx.company);
        return of(true);
    }
}
