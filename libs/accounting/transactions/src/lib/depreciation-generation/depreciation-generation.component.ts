import { Component, inject, OnInit } from "@angular/core";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {LoginService} from '@ss/common/api-common';
import {DepreciationGenerationService} from './depreciation-generation.service';
import {DepreciationRow} from './depreciation-row';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {AccJournalsService, Journal} from '@ss/accounting/accounting-api';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-depreciation-generation',
    templateUrl: './depreciation-generation.component.html',
    styleUrls: ['./depreciation-generation.component.scss']
})
export class DepreciationGenerationComponent implements OnInit {
    private fb = inject(UntypedFormBuilder);
    minDate: Date = new Date();
    maxDate: Date = new Date();
    journalLookup = new DefaultAutoCompleteModel<Journal>(this.journalSrv);

    public form: UntypedFormGroup | null = null;
    data: DepreciationRow[] = [];
    displayedColumns = ['acc', 'description', 'cCenter', 'debit', 'credit'];
    processing = false;

    constructor(private loginSrv: LoginService,
                private deprecSrv: DepreciationGenerationService,
                private route: ActivatedRoute,
                private shellSrv: ShellService,
                private snackBarSrv: SnackBarService,
                private journalSrv: AccJournalsService) {}

    ngOnInit(): void {
        this.shellSrv.setGoBackPath('..', this.route);
        this.loginSrv
            .loadContext()
            .subscribe(res => {
                    this.minDate = new Date(this.loginSrv.appCtx?.accYear, this.loginSrv.appCtx.accPeriod - 1, 1);
                    const nextMonth = new Date(this.loginSrv.appCtx.accYear, this.loginSrv.appCtx.accPeriod, 1);
                    this.maxDate = nextMonth;
                    this.maxDate.setDate(0);
                    const max = 12;
                    this.form = this.fb.group({
                        from:    [1,  [Validators.required, Validators.min(1), Validators.max(max)]],
                        to:      [12, [Validators.required, Validators.min(1), Validators.max(max)]],
                        byCC:    [false, Validators.required],
                        year:    [this.loginSrv.appCtx.accYear],
                        dType:   [2, Validators.required],
                        journal: [null, Validators.required],
                        date:    [new Date(this.loginSrv.appCtx.accYear, this.loginSrv.appCtx.accPeriod - 1, 1), Validators.required],
                    });
                });
    }

    refresh() {
        this.deprecSrv
            .getDepreciation(this.form?.value)
            .subscribe(res => this.data = res);
    }

    generate() {
        this.deprecSrv
            .generateDepreciation(this.form?.value)
            .subscribe(res => this.snackBarSrv.showSuccessMessage());
    }
}
