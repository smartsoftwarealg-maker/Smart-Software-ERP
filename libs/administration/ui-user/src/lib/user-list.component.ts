import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {User, UserService} from '@ss/common/api-users';
import {LoginService} from '@ss/common/api-common';

@Component({
    selector: 'ss-bank-list',
    styleUrls: ['./user-list.component.scss'],
    templateUrl: './user-list.component.html'
})
export class UserListComponent extends BaseEntityListComponent<User> {
    displayedColumns = this.loginSrv.userSrv.userInfo.user.manager?
        ['description', 'fullName', 'manager', 'responsible',  'blocked'] :
        ['description', 'fullName',];


    constructor(
        private loginSrv: LoginService,
        public userSrv: UserService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService) {
        super(userSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'ADMINISTRATION_BANK');
    }
}
