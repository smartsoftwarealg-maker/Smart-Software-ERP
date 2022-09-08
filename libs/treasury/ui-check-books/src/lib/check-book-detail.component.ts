import { Component, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { CheckBookService, CheckBook } from '@ss/treasury/api-check-books';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { HttpService, LoginService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { LookupsService, Bank } from '@ss/common/api-lookup';
import { switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'ss-check-book-detail',
    styleUrls: ['./check-book-detail.component.scss'],
    templateUrl: './check-book-detail.component.html'
})
export class CheckBookDetailComponent extends BaseEntityDetailComponent<CheckBook> implements OnInit {

    aid = 0;
    banks: Bank[];

    constructor(
        public checkBookSrv: CheckBookService,
        public lookupsSrv: LookupsService,
        private loginSrv: LoginService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public httpSrv: HttpService,
        public router: Router) {
        super(checkBookSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'TRS_EDIT_CHECKBOOKS');
    }

    public preload(): Observable<any> {
        return this.lookupsSrv.getBanks()
            .pipe(tap(x => { this.banks = x }));
    }

    finishLoading(e: CheckBook) {
        super.finishLoading(e);
    }

    public setupForm(a: CheckBook) {
        this.aid = a.id;
        if (!a.id || !a.centerId) {
            a.centerId = this.loginSrv.appCtx.center;
        }
        return this.formBuilder.group({
            id: [a.id],
            centerId: [a.centerId || this.loginSrv.appCtx.center, Validators.required],
            bankId: [a.bankId, Validators.required],
            bookYear: [a.bookYear, Validators.required],
            fromNumber: [a.fromNumber, Validators.required],
            toNumber: [a.toNumber, Validators.required],
            bankName: [a.bankName]
        });
    }

}
