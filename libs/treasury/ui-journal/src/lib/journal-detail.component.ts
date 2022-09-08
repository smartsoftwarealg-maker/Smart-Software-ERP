import { Component, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { JournalService, Journal } from '@ss/treasury/api-journal';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { HttpService, LoginService } from '@ss/common/api-common';

@Component({
    selector: 'ss-journal-detail',
    styleUrls: ['./journal-detail.component.scss'],
    templateUrl: './journal-detail.component.html'
})
export class JournalDetailComponent extends BaseEntityDetailComponent<Journal> implements OnInit {
    constructor(
        public journalSrv: JournalService,
        public loginSrv: LoginService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public httpSrv: HttpService,
        public router: Router) {
        super(journalSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'TRS_EDIT_JOURNALS');
    }

}
