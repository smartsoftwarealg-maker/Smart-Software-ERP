import { Component, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { CheckService, Check } from '@ss/treasury/api-checks';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { HttpService } from '@ss/common/api-common';

@Component({
    selector: 'ss-check-detail',
    styleUrls: ['./check-detail.component.scss'],
    templateUrl: './check-detail.component.html'
})
export class CheckDetailComponent extends BaseEntityDetailComponent<Check> implements OnInit {

    aid = 0;

    constructor(
        public checkSrv: CheckService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public httpSrv: HttpService,
        public router: Router) {
        super(checkSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_EDIT_ARTICLE');
    }

    finishLoading(e: Check) {
        super.finishLoading(e);
    }

    public setupForm(a: Check) {
        this.aid = a.id;
        return this.formBuilder.group({
            id: [a.id],
            number: [a.number, Validators.required],
        });
    }

}
