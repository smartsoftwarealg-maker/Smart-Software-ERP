import { Component, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { CheckBookService, CheckBook } from '@ss/treasury/api-check-books';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { HttpService, LoginService, MaterialModule } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { LookupsService, Bank } from '@ss/common/api-lookup';
import { tap } from 'rxjs/operators';
import { MatCard } from '@angular/material/card';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'ss-check-book-detail',
    styleUrls: ['./check-book-detail.component.scss'],
    templateUrl: './check-book-detail.component.html',
    standalone: true,
    imports: [MaterialModule, MatCard, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatSelect, MatOption, MatInput]
})
export class CheckBookDetailComponent extends BaseEntityDetailComponent<CheckBook> implements OnInit {

    aid = 0;
    banks: Bank[];

    constructor(
        public checkBookSrv: CheckBookService,
        public lookupsSrv: LookupsService,
        private loginSrv: LoginService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public httpSrv: HttpService,
        public router: Router) {
        super(checkBookSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'TRS_CHECKBOOKS');
    }

    public override preload(): Observable<any> {
        return this.lookupsSrv.getBanks()
            .pipe(tap(x => { this.banks = x }));
    }

    override finishLoading(e: CheckBook) {
        super.finishLoading(e);
    }

    public override setupForm(a: CheckBook) {
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
