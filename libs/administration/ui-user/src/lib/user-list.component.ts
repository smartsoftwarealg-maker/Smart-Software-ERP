import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LoginService, User} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {UserListService} from '@ss/common/api-users';

@Component({
    selector: 'ss-bank-list',
    styleUrls: ['./user-list.component.scss'],
    templateUrl: './user-list.component.html'
})
export class UserListComponent extends BaseEntityListComponent<User> implements OnInit {
    isManager = false;
    displayedColumns = this.loginSrv.appCtx.manager?
        ['description', 'fullName', 'manager', 'responsible',  'blocked'] :
        ['description', 'fullName',];


    constructor(
        private loginSrv: LoginService,
        public userSrv: UserListService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService) {
        super(userSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'ADMINISTRATION_USERS');
        this.isManager = loginSrv.appCtx.manager;
    }

    ngOnInit() {
        if (!this.isManager) {
            this.addButton.visible = false;
            this.deleteButton.visible = false;
        }
        super.ngOnInit();
    }
}
