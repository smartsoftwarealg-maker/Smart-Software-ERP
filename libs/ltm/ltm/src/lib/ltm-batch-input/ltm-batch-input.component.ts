import {Component, OnDestroy, OnInit} from '@angular/core';
import {Batch, LTMLine, LTMMatter} from '../ltm-api';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LtmLineService} from '../ltm-line.service';
import {LtmLineMatterService} from '../ltm-line-matter.service';
import {LtmMatterTestService} from '../ltm-matter-test.service';
import {LtmBatchService} from '../ltm-batch.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LtmPeriodicityService} from '../ltm-periodicity.service';
import {map, Observable, of, Subscription} from 'rxjs';
import {Lookup} from '@ss/common/api-lookup';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
    selector: 'ss-ltm-batch-input',
    templateUrl: './ltm-batch-input.component.html',
    styleUrls: ['./ltm-batch-input.component.scss'],
})
export class LtmBatchInputComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private _periodicity = 0;
    private matters: LTMMatter[] = [];
    private TODAY = new Date();
    private formulaMap = new Map<string, string>();
    periods$: Observable<Lookup[]> = of([]);
    public saveButton: ToolbarButton = {
        icon: 'fas fa-save',
        label: 'COMMON_SAVE',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS, // save button is too important to hide
        click: () => this.save()
    };

    labels: string[] = [];
    totalsLabels: string[] = [];
    variables: string[] = [];
    formulas: string[] = [];
    selectedMatter: LTMMatter = null;
    lineLookup = new DefaultAutoCompleteModel(this.lineSrv);

    form = this.formBuilder.group(
        {
            parentId:  [0, Validators.required],
            matterId:  [0, Validators.required],
            timeStamp: [this.TODAY, Validators.required],
            tests:     this.formBuilder.array([])
        }
    );

    totalsForm = this.formBuilder.group({ totals: this.formBuilder.array([]) });

    constructor(
        public  entitySrv: LtmBatchService,
        public  shellSrv: ShellService,
        public  snackBarSrv: SnackBarService,
        public  route: ActivatedRoute,
        public  formBuilder: FormBuilder,
        public  confirmationSrv: ConfirmationDialogService,
        private lineSrv: LtmLineService,
        private matterSrv: LtmLineMatterService,
        private testSrv:    LtmMatterTestService,
        private periodSrv: LtmPeriodicityService) {
        this.lineLookup.onObjectSelected = (l) => this.onLine(l);
        this.TODAY.setHours(1, 0, 0, 0);
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(s => s.unsubscribe());
    }

    ngOnInit() {
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setButtons([this.saveButton]);
        this.shellSrv.setTitle('LTM_BATCH_TESTINGS')
        this.periods$ = this.periodSrv.getList(0, 50).pipe(map(res => res.body));
        this.subscriptions.push(
        this.form
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(value => this.refreshFormulas()));
    }


    private compute(formula: string, values: number[], i: number): string {
        if (i < values.length) {
            const temp = this.variables[i]? formula.replace(this.variables[i], values[0]+'').trim() : formula;
            return this.compute(temp, values, i+ 1);
        } else {
            return formula.trim();
        }
    }

    private refreshFormulas() {
        const values = this.variables.map((v, i) => {
            return v? this.tests.at(i)?.value.value : 0;
        });
        const result = this.formulas.map(f => 0);
        const program = this.variables.filter(v => v).map((v, i) =>
            `const ${v} = ${values[i]};`).join('\n') +
            '\n' +
            this.formulas.map((f, i) => `result[${i}] = ${f};`).join('\n');

        //console.log(program);
        try {
            eval(program);
        } catch (e: any ) {};
        this.totals.controls.forEach((c, i) => c.setValue( { value: +result[i].toFixed(4)}))
    }

    onLine(line: LTMLine) {
        this.matterSrv.setParentId(line?.id || 0);
        this.matterSrv
            .getList(0, 50)
            .subscribe(res =>
                this.matters = res.body.map(lm => {
                    return {id: lm.matterId, description: lm.description }
                })
            );
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
        this.form.controls['matterId'].setValue(this.testSrv.getParentId() || 0);
        this.saveButton.disabled = false;
        this.testSrv.sortColumn = { active: 'id', direction: ''};
        this.testSrv
            .getList(0, 50, null, 'id')
            .subscribe(res => {
                res.body
                    .filter(t => (this._periodicity < 1 || this._periodicity === t.periodicity) && !t.formula)
                    .forEach(t => {
                        this.labels.push(t.testDescription);
                        if (t.variable) {
                            this.variables.push(t.variable);
                        }
                        const testForm = this.formBuilder.group({
                            testId:   [{ value: t.testId, disabled: true }, Validators.required],
                            value:    [0,        Validators.required]
                        });
                        this.tests.push(testForm);
                    });

                res.body
                    .filter(t => (this._periodicity < 1 || this._periodicity === t.periodicity) && t.formula && t.testDescription)
                    .forEach(t => {
                        this.totalsLabels.push(t.testDescription);
                        this.formulas.push(t.formula);
                        if (t.variable) {
                            this.formulaMap.set(t.variable, t.formula);
                        }
                        const testForm = this.formBuilder.group({
                            value:    [{ value: 0, disabled: true}]
                        });
                        this.totals.push(testForm);
                    });
                const formulaVars = Array.from(this.formulaMap.keys());
                this.formulas = this.formulas.map(f => this.replaceFormulas(f) );
                console.log(this.formulas);
            });
    }

    private replaceFormulas(f: string): string {
        let res = f;
        this.formulaMap.forEach((v, k) =>  console.log(k, v));
        this.formulaMap.forEach((v, k) => res = res.replace(k, '(' + v + ')'));
        return res;
    }
    onMatter(m: LTMMatter) {
        this.selectedMatter = m;
        this.testSrv.setParentId(m.id);
        this.refreshData();
    }

    private save() {
        const formValue: Batch = this.form.getRawValue() as Batch;
        if (formValue.matterId && formValue.parentId) {
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
        if (this.testSrv.getParentId() > 0) {
            this.refreshData();
        }
    }

    onHour(h: number) {
        const value = this.form.getRawValue();
        const date = new Date(value.timeStamp);
        date.setHours(h, 0)
        value.timeStamp = date;
        this.form.setValue(value);
    }
}
