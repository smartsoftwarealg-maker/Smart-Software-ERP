import { Component, inject, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { JournalService, Journal, JournalUserService } from '@ss/treasury/api-journal';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { HttpService, LoginService, MaterialModule } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { LookupsService, Bank } from '@ss/common/api-lookup';
import { tap } from 'rxjs/operators';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-journal-detail',
    styleUrls: ['./journal-detail.component.scss'],
    templateUrl: './journal-detail.component.html',
    standalone: true,
    imports: [MaterialModule, MatCard, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError, MatSelect, MatOption, RouterOutlet, TranslatePipe]
})
export class JournalDetailComponent extends BaseEntityDetailComponent<Journal> implements OnInit {
    private journalUserSrv = inject(JournalUserService);
    banks: Bank[];
    journalTypes = [
        {id: 1, description: 'CASH'},
        {id: 2, description: 'BANK'},
    ];

    constructor(
        public journalSrv: JournalService,
        public lookupsSrv: LookupsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        private httpSrv: HttpService,
        private router: Router,
        private loginSrv: LoginService) {
        super(journalSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_JOURNALS');
    }

    public override preload(): Observable<any> {
        return this.lookupsSrv.getBanks()
            .pipe(tap(x => { this.banks = x; }));
    }

    override loadEntity(id: number): Observable<Journal> {
        this.journalUserSrv.setParentId(id);
        return super.loadEntity(id);
    }

    public override setupForm(a: Journal) {
        this.id = a.id;
        return this.formBuilder.group({
            id:          [a.id],
            description: [a.description, Validators.required],
            jType:       [a.jType || 1, Validators.required],
            bankId:      [{ value: a.bankId, disabled: (a.jType || 1) === 1 }],
            bankAccount: [{ value: a.bankAccount, disabled: (a.jType || 1) === 1 }],
            centerId:    [a.centerId || this.loginSrv.appCtx.center]
        });
    }

    onJournalType(event: number) {
        if (event === 2) {
            this.form.controls['bankId']?.enable({onlySelf: true});
            this.form.controls['bankAccount']?.enable({onlySelf: true});
        } else {
            this.form.controls['bankId']?.disable({onlySelf: true});
            this.form.controls['bankAccount']?.disable({onlySelf: true});
        }
    }
}
