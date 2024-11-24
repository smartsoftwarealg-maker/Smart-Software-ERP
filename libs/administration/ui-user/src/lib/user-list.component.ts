import { Component, inject, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LoginService, PaginatorPersistenceService, User} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {UserListService} from '@ss/common/api-users';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '../../../../common/ui-lang/src/lib/translate.directive';
import { MatCheckbox } from '@angular/material/checkbox';
import { PaginationComponent } from '../../../../common/ui-pagination/src/lib/pagination.component';

@Component({
    selector: 'ss-bank-list',
    styleUrls: ['./user-list.component.scss'],
    templateUrl: './user-list.component.html',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatCheckbox, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent]
})
export class UserListComponent extends BaseEntityListComponent<User> implements OnInit {
    private loginSrv = inject(LoginService);
    isManager = this.loginSrv.appCtx.manager;
    displayedColumns = this.loginSrv.appCtx.manager?
        ['description', 'fullName', 'manager', 'responsible',  'blocked'] :
        ['description', 'fullName',];


    constructor(
        public userSrv: UserListService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(userSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'ADMINISTRATION_USERS');
        this.pagination.pageSize = 15;
    }

    override ngOnInit() {
        if (!this.isManager) {
            this.addButton.visible = false;
            this.deleteButton.visible = false;
        }
        super.ngOnInit();
    }
}
