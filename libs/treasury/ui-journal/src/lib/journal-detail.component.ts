import { Component, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { JournalService, Journal } from '@ss/treasury/api-journal';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { LookupsService, Bank, Lookup } from '@ss/common/api-lookup';
import { switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'ss-journal-detail',
    styleUrls: ['./journal-detail.component.scss'],
    templateUrl: './journal-detail.component.html'
})
export class JournalDetailComponent extends BaseEntityDetailComponent<Journal> implements OnInit {
    banks: Bank[];
    journalTypes: Lookup[];

    constructor(
        public journalSrv: JournalService,
        public lookupsSrv: LookupsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public httpSrv: HttpService,
        public router: Router) {
        super(journalSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'TRS_EDIT_JOURNAL');
    }

    public override preload(): Observable<any> {
        return this.lookupsSrv.getBanks()
            .pipe(
                tap(x => { this.banks = x }),
                switchMap(() => this.lookupsSrv.getJournalTypes()),
                tap(x => { this.journalTypes = x }),
            );
    }

    public override setupForm(a: Journal) {
        this.id = a.id;
        return this.formBuilder.group({
            id: [a.id],
            description: [a.description, Validators.required],
            jType: [a.jType, Validators.required],
            bankId: a.bankId,
            bankAccount: a.bankAccount,
            centerId: a.centerId
        });
    }
}
