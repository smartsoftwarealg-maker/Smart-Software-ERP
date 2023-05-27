import { Component, inject } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { UserMessage } from '../workflow-api';
import { LoginService, PaginatorPersistenceService } from '@ss/common/api-common';
import { UserListService } from '@ss/common/api-users';
import { FormControl } from '@angular/forms';
import { UserLookup } from '@ss/common/ui-auto-complete';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { UserReceivedMessageService } from '../user-received-message.service';

@Component({
    selector: 'ss-user-received-message-list',
    templateUrl: '../user-message-list/user-message-list.component.html',
    styleUrls: ['../user-message-list/user-message-list.component.scss'],
})
export class UserReceivedMessageListComponent  extends BaseEntityListComponent<UserMessage> {
    private loginSrv  = inject(LoginService);
    private usersSrv =  inject(UserListService);
    userCtrl = new FormControl<number>(this.loginSrv.appCtx.id);
    userAutoComplete = new UserLookup(this.usersSrv);
    displayedColumns = [
        'messageDescription',
        'amount',
    ];

    constructor(
        public override entitySrv: UserReceivedMessageService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'ADMINISTRATION_USER_RECEIVED_MESSAGES');
        this.userAutoComplete.onObjectSelected = u => {
            this.entitySrv.setParentId(u?.id || 0);
            this.refresh();
        };
        this.entitySrv.setParentId(this.loginSrv.appCtx.id);
    }
}
