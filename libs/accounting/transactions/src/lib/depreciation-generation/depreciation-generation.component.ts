import { Component, inject, OnInit, signal} from "@angular/core";
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {DepreciationGenerationService} from './depreciation-generation.service';
import {DepreciationRow} from './depreciation-row';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from "@angular/router";
import {AccJournalsService, Journal} from '@ss/accounting/accounting-api';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CommonModule } from "@angular/common";



import { DatePickerComponent } from "@ss/common/ui-datepicker";
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';



@Component({
    selector: 'ss-depreciation-generation',
    templateUrl: './depreciation-generation.component.html',
    styleUrls: ['./depreciation-generation.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        DatePickerComponent,
        UiAutoCompleteComponent
    ]
})
export class DepreciationGenerationComponent implements OnInit {
    private fb = inject(UntypedFormBuilder);
    private loginSrv = inject(LoginService);
    private deprecSrv = inject(DepreciationGenerationService);
    private route = inject(ActivatedRoute);
    private shellSrv = inject(ShellService);
    private snackBarSrv = inject(SnackBarService);
    private journalSrv = inject(AccJournalsService);

    minDate: Date = new Date();
    maxDate: Date = new Date();
    journalLookup = new DefaultAutoCompleteModel<Journal>(this.journalSrv);

    public form: UntypedFormGroup | null = null;
    data = signal<DepreciationRow[]>([]);
    loading = signal(true);
    readonly displayedColumns = (['acc', 'description', 'cCenter', 'debit', 'credit']);
    processing = signal(false);


    ngOnInit(): void {
        this.loading.set(true);
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setTitle('ACC_DEPRECIATION_GENERATION');
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
                    this.loading.set(false);
                });
    }

    refresh() {
        this.processing.set(true);
        this.deprecSrv
            .getDepreciation(this.form?.value)
            .subscribe(res => {
                this.data.set(res);
                this.processing.set(false);
            });
    }

    generate() {
        this.processing.set(true);
        this.deprecSrv
            .generateDepreciation(this.form?.value)
            .subscribe(res => {
                this.snackBarSrv.showSuccessMessage();
                this.processing.set(false);
            });
    }
}
