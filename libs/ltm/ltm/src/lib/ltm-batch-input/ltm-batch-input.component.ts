import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Batch, LTMLineMatter } from '../ltm-api';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { FormArray, FormBuilder, FormControl, Validators } from "@angular/forms";
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LtmLineMatterService} from '../services/ltm-line-matter.service';
import {LtmMatterTestService} from '../services/ltm-matter-test.service';
import {LtmBatchService} from '../services/ltm-batch.service';
import {LtmPeriodicityService} from '../services/ltm-periodicity.service';
import {map, Observable, of, Subscription, switchMap} from 'rxjs';
import {Lookup} from '@ss/common/api-lookup';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {LtmTestService} from '../services/ltm-test.service';
import { LoginService } from '@ss/common/api-common';

@Component({
    selector: 'ss-ltm-batch-input',
    templateUrl: './ltm-batch-input.component.html',
    styleUrls: ['./ltm-batch-input.component.scss'],
})
export class LtmBatchInputComponent implements OnInit, OnDestroy {
    public  shellSrv  = inject(ShellService);
    private loginSrv = inject(LoginService);
    private subscriptions: Subscription[] = [];
    private _periodicity = 0;
    private TODAY = new Date();
    private formulaMap = new Map<string, string>();
    private missingVariables: string[] = [];
    matters: LTMLineMatter[] = [];
    filteredMatters: LTMLineMatter[] = [];
    periods$: Observable<Lookup[]> = of([]);
    searchField = new FormControl<string|null>('');

    public saveButton: ToolbarButton = {
        icon: 'fas fa-save',
        label: 'COMMON_SAVE',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS, // save button is too important to hide
        click: () => this.save()
    };


    labels: string[] = [];
    limits: number[][] = [];
    totalsLabels: string[] = [];
    variables: string[] = [];
    formulas: string[] = [];
    selectedMatter: LTMLineMatter = null;

    formBuilder = inject(FormBuilder);
    form = this.formBuilder.group(
        {
            centerId:  [this.loginSrv.appCtx.center, Validators.required],
            matterId:  [0, Validators.required],
            timeStamp: [this.TODAY, Validators.required],
            tests:     this.formBuilder.array([])
        }
    );

    totalsForm = this.formBuilder.group({ totals: this.formBuilder.array([]) });

    constructor(
        public  entitySrv: LtmBatchService,
        public  snackBarSrv: SnackBarService,
        public  route: ActivatedRoute,
        public  confirmationSrv: ConfirmationDialogService,
        private matterSrv: LtmLineMatterService,
        private matterTestSrv: LtmMatterTestService,
        private periodSrv: LtmPeriodicityService,
        private testSrv: LtmTestService) {
        this.TODAY.setHours(1, 0, 0, 0);
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(s => s.unsubscribe());
    }

    ngOnInit() {
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setTitle('LTM_BATCH_TESTINGS');
        this.periods$ = this.periodSrv.getList(0, 50).pipe(map(res => res.body));
        const rights = this.shellSrv.getCurrentNodeRights();
        if (rights.edit) {
            this.shellSrv.setButtons([this.saveButton]);
        }

        this.matterSrv
            .getList(0, 50)
            .subscribe(res => this.filteredMatters = this.matters = res.body );

        this.subscriptions.push(
            this.form
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged()
                ).subscribe(() => this.refreshFormulas()));

        this.subscriptions.push(
            this.searchField
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged())
                .subscribe(res =>
                    this.filteredMatters = this.matters
                        .filter(e =>
                            res == null ||
                            res.length == 0 ||
                            e.description?.toLowerCase()?.indexOf(res.toLowerCase()) >= 0))
        );
    }


    // private compute(formula: string, values: number[], i: number): string {
    //     if (i < values.length) {
    //         const temp = this.variables[i]? formula.replace(this.variables[i], values[0]+'').trim() : formula;
    //         return this.compute(temp, values, i+ 1);
    //     } else {
    //         return formula.trim();
    //     }
    // }

    private refreshFormulas() {
        const values = this.variables.map((v, i) => {
            return v? this.tests.at(i)?.value.value : 0;
        });
        const result = this.formulas.map(f => 0);
        const program =
            this.variables.filter(v => v).map((v, i) =>
                `const ${v} = ${values[i]};`).join('\n') +
            '\n' +
            this.missingVariables.map(v => `const ${v} = 0;`).join('\n') +
            '\n' +
            this.formulas.map((f, i) => `result[${i}] = ${f};`).join('\n') ;

        // console.log(program);
        // console.log(result);
        try {
            eval(program);
        } catch (e: any ) { /* empty */ }
        this.totals.controls.forEach((c, i) => c.setValue( { value: (+result[i]||0).toFixed(2)}));
    }


    get tests(): FormArray {
        return this.form.controls['tests'] as FormArray;
    }

    get totals(): FormArray {
        return this.totalsForm.controls['totals'] as FormArray;
    }

    private refreshData() {
        this.tests.clear();
        this.totals.clear();
        this.formulaMap.clear();
        this.labels = [];
        this.formulas = [];
        this.variables = [];
        this.totalsLabels = [];
        this.form.controls['matterId'].setValue(this.matterTestSrv.getParentId() || 0);
        this.saveButton.disabled = false;
        this.matterTestSrv.sortColumn = { active: 'variable', direction: ''};

        this.testSrv
            .getList(0, 999, null, 'variable')
            .pipe(
                tap(res => this.missingVariables = res.body.filter(t => t.variable).map(t => t.variable)),
                tap(res => {
                    res.body
                        .filter(t => t.variable && t.formula)
                        .forEach(v => this.formulaMap.set(v.variable, v.formula));
                }),
                switchMap(_ => this.matterTestSrv.getList(0, 100, null, 'id')))
            .subscribe(res => {
                res.body
                    .filter(t => (this._periodicity < 1 || this._periodicity === t.periodicity) && !t.formula)
                    .forEach(t => {
                        this.labels.push(t.testDescription);
                        this.limits.push([t.minValue, t.maxValue|| 999])
                        if (t.variable) {
                            this.variables.push(t.variable);
                        }
                        const testForm = this.formBuilder.group({
                            testId:   [{ value: t.testId, disabled: true }, Validators.required],
                            value:    [0,        [Validators.required, Validators.min(t.minValue), Validators.max(t.maxValue)]]
                        });
                        this.tests.push(testForm);
                    });
                this.missingVariables = this.missingVariables.filter(v => this.variables.indexOf(v) < 0);
                res.body
                    .filter(t => (this._periodicity < 1 || this._periodicity === t.periodicity) && t.formula && t.testDescription)
                    .forEach(t => {
                        this.totalsLabels.push(t.testDescription);
                        this.formulas.push(t.formula);
                        const testForm = this.formBuilder.group({
                            value:    [{ value: 0, disabled: true}]
                        });
                        this.totals.push(testForm);
                    });
                this.formulas = this.formulas.map(f => this.replaceFormulas(f) );
            });
    }

    private replaceFormulas(f: string): string {
        let res = f;
        this.formulaMap.forEach((v, k) => res = res.replace(k, '(' + v + ')'));
        return res;
    }
    onMatter(m: LTMLineMatter) {
        this.selectedMatter = m;
        this.matterTestSrv.setParentId(m.matterId);
        this.refreshData();
    }

    private save() {
        const formValue: Batch = this.form.getRawValue() as Batch;
        if (formValue.matterId && formValue.centerId) {
            this.shellSrv.setLoading(true);
            this.entitySrv
                .saveBatch(formValue)
                .subscribe({
                    next: res => {
                        this.shellSrv.setLoading(false);
                        formValue.tests.forEach(e => e.value = 0);
                        this.form.reset(formValue);
                        this.snackBarSrv.showSuccessMessage();
                    }, error: err => {
                        this.shellSrv.setLoading(false);
                        throw err;
                    }
                });
        }
    }

    onPeriod(e: number) {
        this._periodicity = e;
        if (this.matterTestSrv.getParentId() > 0) {
            this.refreshData();
        }
    }

    onHour(h: number) {
        const value = this.form.getRawValue();
        const date = new Date(value.timeStamp);
        date.setHours(h, 0);
        value.timeStamp = date;
        this.form.setValue(value);
    }
}
